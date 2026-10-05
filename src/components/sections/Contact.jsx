import { contact, resume } from '../../constants';
import { SectionHeading, TerminalCard } from '../ui/Terminal';
import CopyEmailButton from '../ui/CopyEmailButton';
import SocialLinks, { LinkedInButton } from '../ui/SocialLinks';

const fieldClass =
  'w-full rounded-lg border border-term-border-bright bg-term-bg/50 px-3 py-2.5 font-mono text-sm text-term-text placeholder:text-term-faint transition-colors focus:border-term-accent focus:outline-none';

export default function Contact() {
  return (
    <section id="contact" className="py-16" aria-labelledby="contact-heading">
      <SectionHeading
        command="./say-hello.sh"
        title="Contact"
        description="If this caught your eye, imagine what happens when you reach out!"
        align="center"
        className="mb-14"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <TerminalCard
          label="~/contact/send-message"
          icon="ri-mail-send-line"
          className="lg:col-span-3"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <form
            action={contact.formEndpoint}
            method="POST"
            autoComplete="off"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="New message from portfolio" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="space-y-2">
              <label htmlFor="nama" className="font-mono text-xs text-term-muted">
                name
              </label>
              <input id="nama" type="text" name="nama" placeholder="your-name" className={fieldClass} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="font-mono text-xs text-term-muted">
                email
              </label>
              <input id="email" type="email" name="email" placeholder="you@example.com" className={fieldClass} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="pesan" className="font-mono text-xs text-term-muted">
                message
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={6}
                placeholder="what are you building?"
                className={`${fieldClass} resize-y`}
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-term-accent px-4 py-3 font-mono text-sm font-medium text-term-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-term-accent-dim hover:text-term-text"
            >
              send message
              <i className="ri-send-plane-line" aria-hidden="true" />
            </button>
          </form>
        </TerminalCard>

        <div className="space-y-6 lg:col-span-2">
          <TerminalCard
            label="~/contact/channels"
            icon="ri-links-line"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="120"
            data-aos-once="true"
          >
            <LinkedInButton className="w-full" label="Connect on LinkedIn" />
            <p className="mt-3 font-mono text-xs leading-relaxed text-term-faint">
              The quickest way to reach me. My CV, projects and availability are all listed on my profile.
            </p>

            <div className="mt-6 border-t border-term-border pt-5">
              <p className="font-mono text-xs text-term-muted">{contact.email}</p>
              <CopyEmailButton className="mt-3 w-full" label="Copy email address" />
            </div>

            <div className="mt-6 border-t border-term-border pt-5">
              <p className="mb-3 font-mono text-xs text-term-muted">{contact.location}</p>
              <SocialLinks showLabel />
            </div>

            <div className="mt-6 border-t border-term-border pt-5">
              <a
                href={resume.path}
                download={resume.fileName}
                className="inline-flex items-center gap-2 font-mono text-sm text-term-accent transition-colors hover:text-term-text"
              >
                <i className="ri-download-line" aria-hidden="true" />
                {resume.fileName}
              </a>
            </div>
          </TerminalCard>
        </div>
      </div>

      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
    </section>
  );
}
