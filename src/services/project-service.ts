import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "projects";

export const projectService = {
  async getProjects() {
    const snapshot = await adminDb
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((d) => ({ _id: d.id, ...d.data() }));
  },

  async getProject(id: string) {
    const ref = adminDb.collection(COLLECTION).doc(id);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    return { _id: snapshot.id, ...snapshot.data() };
  },

  async createProject(data: Record<string, unknown>) {
    const ref = await adminDb.collection(COLLECTION).add({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    const created = await ref.get();
    return { _id: created.id, ...created.data() };
  },

  async updateProject(id: string, data: Record<string, unknown>) {
    const ref = adminDb.collection(COLLECTION).doc(id);
    await ref.update({ ...data, updatedAt: FieldValue.serverTimestamp() });
    const updated = await ref.get();
    return { _id: updated.id, ...updated.data() };
  },

  async deleteProject(id: string) {
    const ref = adminDb.collection(COLLECTION).doc(id);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    await ref.delete();
    return { _id: id };
  },
};
