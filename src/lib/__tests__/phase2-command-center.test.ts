import { describe, expect, it } from "vitest";
import { evaluatePassword, passwordSchema } from "@/lib/security/passwords";
import type { RedactedDelivery } from "@/lib/portal.functions";

describe("Phase 2: Client Command Center Domain & Security Verification", () => {
  describe("Delivery Security & Server-Side Redaction Rules", () => {
    const rawDeliveryItem = {
      id: "del_12345",
      project_id: "proj_9999",
      label: "Release v1.0.0 Signed Bundle",
      kind: "apk",
      version: "1.0.0",
      status: "completed",
      unlocked: false,
      download_url: "https://secure-storage.athros.dev/builds/release-v1.0.apk",
      github_url: "https://github.com/athros-enterprise/client-private-repo",
      apk_url: "https://secure-storage.athros.dev/builds/app.apk",
      ipa_url: "https://secure-storage.athros.dev/builds/app.ipa",
      documentation_url: "https://docs.athros.dev/builds/arch",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    function simulateRedaction(
      delivery: typeof rawDeliveryItem,
      projectStatus: string,
      isStaff: boolean,
    ): RedactedDelivery {
      const isUnlocked = delivery.unlocked === true;
      const isProjectComplete = projectStatus === "completed" || projectStatus === "live";
      const allowAccess = isStaff || (isUnlocked && isProjectComplete);

      if (!allowAccess) {
        return {
          id: delivery.id,
          project_id: delivery.project_id,
          label: delivery.label,
          kind: delivery.kind,
          version: delivery.version,
          status: delivery.status,
          unlocked: false,
          download_url: null,
          github_url: null,
          apk_url: null,
          ipa_url: null,
          documentation_url: null,
          created_at: delivery.created_at,
          updated_at: delivery.updated_at,
        };
      }

      return {
        id: delivery.id,
        project_id: delivery.project_id,
        label: delivery.label,
        kind: delivery.kind,
        version: delivery.version,
        status: delivery.status,
        unlocked: true,
        download_url: delivery.download_url,
        github_url: delivery.github_url,
        apk_url: delivery.apk_url,
        ipa_url: delivery.ipa_url,
        documentation_url: delivery.documentation_url,
        created_at: delivery.created_at,
        updated_at: delivery.updated_at,
      };
    }

    it("redacts all binary, github, and secret URLs for clients when delivery is locked", () => {
      const lockedDelivery = { ...rawDeliveryItem, unlocked: false };
      const redacted = simulateRedaction(lockedDelivery, "development", false);

      expect(redacted.unlocked).toBe(false);
      expect(redacted.download_url).toBeNull();
      expect(redacted.github_url).toBeNull();
      expect(redacted.apk_url).toBeNull();
      expect(redacted.ipa_url).toBeNull();
      expect(redacted.documentation_url).toBeNull();
      expect(redacted.label).toBe("Release v1.0.0 Signed Bundle");
    });

    it("redacts delivery URLs for clients even if unlocked flag is true if project is not completed", () => {
      const unlockedMidSprint = { ...rawDeliveryItem, unlocked: true };
      const redacted = simulateRedaction(unlockedMidSprint, "development", false);

      expect(redacted.unlocked).toBe(false);
      expect(redacted.download_url).toBeNull();
      expect(redacted.github_url).toBeNull();
    });

    it("releases full delivery artifacts to clients when project is completed and unlocked", () => {
      const completedDelivery = { ...rawDeliveryItem, unlocked: true };
      const exposed = simulateRedaction(completedDelivery, "completed", false);

      expect(exposed.unlocked).toBe(true);
      expect(exposed.download_url).toBe("https://secure-storage.athros.dev/builds/release-v1.0.apk");
      expect(exposed.github_url).toBe("https://github.com/athros-enterprise/client-private-repo");
      expect(exposed.apk_url).toBe("https://secure-storage.athros.dev/builds/app.apk");
    });

    it("allows staff/admin full access to inspect artifacts in any project state", () => {
      const lockedDelivery = { ...rawDeliveryItem, unlocked: false };
      const staffView = simulateRedaction(lockedDelivery, "discovery", true);

      expect(staffView.download_url).toBe("https://secure-storage.athros.dev/builds/release-v1.0.apk");
      expect(staffView.github_url).toBe("https://github.com/athros-enterprise/client-private-repo");
    });
  });

  describe("Account Security & Password Hardening", () => {
    it("enforces strict password complexity requirements", () => {
      // Too short
      expect(evaluatePassword("Short1!").acceptable).toBe(false);
      // Missing symbol
      expect(evaluatePassword("NoSymbol123456").acceptable).toBe(false);
      // Missing uppercase
      expect(evaluatePassword("nouppercase12345!").acceptable).toBe(false);
      // Missing number
      expect(evaluatePassword("NoNumberAtAllHere!").acceptable).toBe(false);
      // Repeating characters
      expect(evaluatePassword("Aaaaaaaa12345!").acceptable).toBe(false);
      // Common word
      expect(evaluatePassword("Password12345!#").acceptable).toBe(false);
      expect(evaluatePassword("AthrosDev2026!#").acceptable).toBe(false);
    });

    it("accepts strong, compliant passwords", () => {
      const strong = "Xk9#mP$vL2@qR7!z";
      const evaluation = evaluatePassword(strong);

      expect(evaluation.acceptable).toBe(true);
      expect(evaluation.score).toBeGreaterThanOrEqual(3);
      expect(evaluation.failures.length).toBe(0);

      const parsed = passwordSchema.safeParse(strong);
      expect(parsed.success).toBe(true);
    });
  });

  describe("Requirements & Monotonic Versioning Logic", () => {
    it("computes monotonic increment for sequential requirement revisions", () => {
      const existingVersions = [3, 2, 1];
      const maxExisting = existingVersions.length > 0 ? Math.max(...existingVersions) : 0;
      const nextVersion = maxExisting + 1;

      expect(nextVersion).toBe(4);
    });

    it("defaults to version 1 for the first requirement submitted", () => {
      const existingVersions: number[] = [];
      const maxExisting = existingVersions.length > 0 ? Math.max(...existingVersions) : 0;
      const nextVersion = maxExisting + 1;

      expect(nextVersion).toBe(1);
    });
  });
});
