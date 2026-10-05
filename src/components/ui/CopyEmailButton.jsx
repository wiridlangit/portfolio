import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { contact } from '../../constants';

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand('copy');
    if (!copied) throw new Error('Copy command was rejected');
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function CopyEmailButton({ className = '', label = 'Copy email', icon = 'ri-file-copy-line' }) {
  const { notify } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyText(contact.email);
      setCopied(true);
      notify(`Copied ${contact.email} to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      notify('Could not copy — grab the address manually', { tone: 'error' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-term-border-bright bg-term-surface/60 px-4 py-2.5 font-mono text-sm text-term-text transition-all duration-200 hover:-translate-y-0.5 hover:border-term-accent hover:text-term-accent ${className}`}
    >
      <i className={`${copied ? 'ri-checkbox-circle-line text-term-accent' : icon}`} aria-hidden="true" />
      {copied ? 'Copied' : label}
    </button>
  );
}
