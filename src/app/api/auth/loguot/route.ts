"use server";

import { signOut } from "../../../../../auth";

export async function POST() {
  logout();
}

export const logout = async () => {
  await signOut();
};
