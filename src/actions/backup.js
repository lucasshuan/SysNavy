const BACKUP_VERSION = 1;

export function createBackupPayload({ theme, people, roles }) {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      theme,
      people,
      roles,
    },
  };
}

export function parseBackupPayload(text) {
  const parsed = JSON.parse(text);
  if (parsed?.data) {
    return normalizePayload(parsed.data);
  }
  return normalizePayload(parsed);
}

function normalizePayload(data) {
  if (!data || !Array.isArray(data.people) || !Array.isArray(data.roles)) {
    throw new Error("Backup inválido");
  }
  const theme = data.theme === "dark" ? "dark" : "light";
  return {
    theme,
    people: data.people,
    roles: data.roles,
  };
}

export function downloadBackup(payload, filename) {
  const content = JSON.stringify(payload, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
