import { JSEncrypt } from "jsencrypt";
import { fetchPublicKey } from "../api/join/publicKey";

export async function encryptWithRSAFromServer(
  plainText: string
): Promise<{ encrypted: string | null; rsaSeq: string | null }> {
  try {
    const response = await fetchPublicKey();

    if (!response || !response.data) {
      return { encrypted: null, rsaSeq: null };
    }

    const axiosData = response.data;

    const { data } = axiosData;

    if (!data) {
      return { encrypted: null, rsaSeq: null };
    }

    if (!data.publicKey || !data.seq) {
      return { encrypted: null, rsaSeq: null };
    }

    const { publicKey, seq: rsaSeq } = data;

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const encrypted = encryptor.encrypt(plainText);

    if (!encrypted) {
      return { encrypted: null, rsaSeq: null };
    }

    return {
      encrypted,
      rsaSeq,
    };
  } catch (error) {
    console.error("RSA encryption error:", error);
    return { encrypted: null, rsaSeq: null };
  }
}
