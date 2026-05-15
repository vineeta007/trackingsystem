import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "team_members";

export const teamService = {
  async getTeamMembers() {
    const snapshot = await adminDb
      .collection(COLLECTION)
      .orderBy("name", "asc")
      .get();
    return snapshot.docs.map((d) => ({ _id: d.id, ...d.data() }));
  },

  async createTeamMember(data: Record<string, unknown>) {
    const ref = await adminDb.collection(COLLECTION).add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const created = await ref.get();
    return { _id: created.id, ...created.data() };
  },

  async deleteTeamMember(id: string) {
    const ref = adminDb.collection(COLLECTION).doc(id);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    await ref.delete();
    return { _id: id };
  },
};
