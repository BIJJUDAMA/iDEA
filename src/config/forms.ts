export const TYPEFORM_BASE_URL = "https://form.typeform.com/to";

interface FormEnv {
  VITE_TYPEFORM_PROPOSE_PROJECT?: string;
  VITE_TYPEFORM_JOIN_COMMUNITY?: string;
  VITE_TYPEFORM_JOIN_PROJECT?: string;
}

const env = import.meta.env as unknown as FormEnv;

export const formIds = Object.freeze({
  proposeProject: env.VITE_TYPEFORM_PROPOSE_PROJECT ?? "Csq4ijcx",
  joinCommunity: env.VITE_TYPEFORM_JOIN_COMMUNITY ?? "KS9VXRHf",
  joinProject: env.VITE_TYPEFORM_JOIN_PROJECT ?? "BEDaiz9s",
});

export function getTypeformUrl(
  formId: string,
  hidden?: Record<string, string>,
): string {
  const base = `${TYPEFORM_BASE_URL}/${encodeURIComponent(formId)}`;
  if (!hidden || Object.keys(hidden).length === 0) {
    return base;
  }
  const params = new URLSearchParams(hidden).toString();
  return `${base}#${params}`;
}
