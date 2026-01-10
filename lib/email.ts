import nodemailer from 'nodemailer';

export async function sendNewsletter(post: { title: string, slug: string, excerpt: string }, subscribers: string[]) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        throw new Error("SMTP credentials missing. Please check .env.local");
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Send generic email for now - in production use a queue or batching
    for (const email of subscribers) {
        try {
            await transporter.sendMail({
                from: '"Foxmen Studio" <info@foxmenstudio.com>',
                to: email,
                subject: `New Transmission: ${post.title}`,
                html: `
                    <div style="font-family: monospace; background-color: #fffff3; padding: 40px; color: #414042;">
                        <h1 style="font-size: 24px; margin-bottom: 20px;">FOXMEN STUDIO // LOG</h1>
                        <hr style="border: 0; border-bottom: 1px solid #ddd; margin-bottom: 20px;" />
                        <h2 style="font-size: 32px; font-weight: bold; margin-bottom: 10px;">${post.title}</h2>
                        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                            ${post.excerpt}
                        </p>
                        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}" style="background-color: #6E35FF; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; display: inline-block;">
                            READ ARTICLE
                        </a>
                        <div style="margin-top: 40px; font-size: 12px; opacity: 0.6;">
                            System Broadcast / ${new Date().toISOString()}
                        </div>
                    </div>
                `,
            });
        } catch (error) {
            console.error(`Failed to send email to ${email}`, error);
        }
    }
}
