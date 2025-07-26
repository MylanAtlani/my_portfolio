import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/rate-limit';
import { validateServerSide } from '@/lib/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Vérification du Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type invalide' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, company, project, budget, message, honeypot } = body;

    // Vérification du honeypot
    if (honeypot && honeypot.trim() !== '') {
      console.log('Spam détecté via honeypot');
      return NextResponse.json(
        { error: 'Requête invalide' },
        { status: 400 }
      );
    }

    // Validation côté serveur
    const validation = validateServerSide({ name, email, company, project, budget, message });
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error || 'Données invalides' },
        { status: 400 }
      );
    }

    // Rate limiting par IP (renforcé : 2 requêtes par minute)
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    
    const isAllowed = checkRateLimit(clientIP, 2, 60000); // 2 requêtes par minute (plus strict)
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans 1 minute.' },
        { status: 429 }
      );
    }

    // Rate limiting par email (renforcé : 1 requête par email en 5 minutes)
    const emailRateLimit = checkRateLimit(`email:${email}`, 1, 300000); // 1 requête par email en 5 minutes
    if (!emailRateLimit) {
      return NextResponse.json(
        { error: 'Un email par adresse toutes les 5 minutes maximum. Veuillez réessayer plus tard.' },
        { status: 429 }
      );
    }

    // Vérification de la taille du message
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message trop long' },
        { status: 400 }
      );
    }

    // Envoi de l'email de notification
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>IP :</strong> ${clientIP}</p>
            ${company ? `<p><strong>Entreprise :</strong> ${company}</p>` : ''}
            ${project ? `<p><strong>Type de projet :</strong> ${project}</p>` : ''}
            ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ''}
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Message envoyé depuis votre portfolio</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    // Email de confirmation automatique
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [email],
      subject: 'Confirmation de votre message - Mylan Atlani',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Merci pour votre message !</h2>
          
          <p>Bonjour ${name},</p>
          
          <p>J'ai bien reçu votre message et je vous répondrai dans les 24h.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Récapitulatif de votre demande</h3>
            ${project ? `<p><strong>Type de projet :</strong> ${project}</p>` : ''}
            ${budget ? `<p><strong>Budget :</strong> ${budget}</p>` : ''}
            <p><strong>Message :</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
          </div>
          
          <p>En attendant ma réponse, n'hésitez pas à consulter mon portfolio complet :</p>
          <p><a href="https://moonimize.collective.work/" style="color: #007bff;">Portfolio complet</a></p>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>Mylan Atlani - Lead Dev Freelance & CTO</p>
            <p>📍 Marseille, France</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}