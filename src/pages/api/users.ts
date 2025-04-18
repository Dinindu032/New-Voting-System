// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

const serviceAccount = {
  type: "service_account",
  project_id: "voting-system-41e3b",
  private_key_id: "1848bc285d6674a989494f3bc5341a02db8b441e",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDY0JpiJJEUFOk4\n8e8V4dl6RtaK6a7MvSfS921O/YL0wdISAdWHc/eVHCWlzF/n4nTCyodFPCSKIxDj\nRajjj+u1HXeBQR/sBW2e7Za6mA9XURpBiNRHJcZRh53wZ6wo3V1DT8d8qGCbSAZQ\n5NaSr4KE1JRAY2gUPXXPtP/8E9eyqfeEjOe8OhiCO6Aj20RkQ6KkcwsF/EwN4oF3\n7q8Lf9fqpChUs0BmyagSuU0R+oemJuTgQwgan2M1G+XiaeFu+YPVhgdVT61BC7IJ\nBd31uqIm/P+56dNhr7OJ6R8TbVP4fh3dgvq40hLvJ2SgU2Yum3SW38BE2pSIcP9j\nrwp/DHDzAgMBAAECggEAFOj1Yq61ITMtFPVcQgeAkmbfjREhbxR1EUcUjzAq35EL\nwfnUTpZ0E7jdtqJBw5rW+OxQZHB686mTGOAgfCXmrRZ07o3J1tjlLBUs2r0MibbE\nKfrYwi3V9Qn3xPYyp9RFiNbaXd7dRkyJc2bGfOoZU9cunxEXOhB9WrVRlM2TGWNW\njpAwzanRR97O+rsm224i+Sxz03XhWwi/bGd6E2NtqWQlT64AXaWl0oRpy4Sj9iUL\nHwmEL86VcDPCQ1+28m4OX8zW865ka0y6pmjVvi/qVbvYc6gOw+kaZ7gwIdtpM0a3\nzjdiEqTD26eNzlK2l7Bz/gSofY/DXB/8kgFCyaV/HQKBgQDtR7Jwp1LrfQBmmYzm\nSKpS6KhKvOMfOiGRf1COpiyYHBXWygZZ+T0Bv8YZgRgK8E/k+XjVW2QrE9ldHRP3\nO+8Brb/kq54gZ7FqktnHPrR1+VLf5FxkGQeDBwsQUAa4ck07FJ+dRwAWGbVixufO\ngzwK2+54IgEhDn6ZVy8wQnpyhwKBgQDp65Lmy5E10n9gmppy+91r3uQV+TKT+Moi\nIM0CfV0W5/BeTqhH6bYQvULbwgmx63xsgeQXRdUfBtLZKgb7Q/3RkUvTdUnwaw5/\n9TX8TlZeLGbSJixu0b7B1/XwtUiiBHFIVCaHGdqijjlirU/FLbrsJsam4mDgX6BF\nSDpl5SctNQKBgHxGggIY0Qg/tzcFk1OFmZfE/WfvmHFhi/Vdnj6ocFDW3OVbeIol\nTTue...",
  client_email: "firebase-adminsdk-fbsvc@voting-system-41e3b.iam.gserviceaccount.com",
  client_id: "114872164770511941961",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40voting-system-41e3b.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const listUsers = async (nextPageToken?: string): Promise<any[]> => {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      const users = result.users.map(userRecord => ({
        uid: userRecord.uid,
        email: userRecord.email,
      }));

      if (result.pageToken) {
        return users.concat(await listUsers(result.pageToken));
      } else {
        return users;
      }
    };

    const users = await listUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users from Firebase' });
  }
};

export default handler;
