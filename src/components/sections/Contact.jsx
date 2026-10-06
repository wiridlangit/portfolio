import { contact, resume } from '../../constants';
import { SectionHeading, TerminalCard } from '../ui/Terminal';
import CopyEmailButton from '../ui/CopyEmailButton';
import SocialLinks, { LinkedInButton } from '../ui/SocialLinks';

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

      <div className="mx-auto max-w-2xl">
        <TerminalCard
          label="~/contact/channels"
          icon="ri-links-line"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <LinkedInButton className="w-full" label="Connect on LinkedIn" />

          <p className="mt-3 font-mono text-xs leading-relaxed text-term-faint">
            The quickest way to reach me. My CV, projects and availability are all listed on my profile.
          </p>

          <div className="mt-6 border-t border-term-border pt-5">
            <p className="font-mono text-xs text-term-muted">
              {contact.email}
            </p>

            <CopyEmailButton
              className="mt-3 w-full"
              label="Copy email address"
            />
          </div>

          <div className="mt-6 border-t border-term-border pt-5">
            <p className="mb-3 font-mono text-xs text-term-muted">
              {contact.location}
            </p>

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

      <h2 id="contact-heading" className="sr-only">
        Contact
      </h2>
    </section>
  );
}