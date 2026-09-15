"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              workspace_name: workspaceName,
            },
          },
        });

        if (error) throw error;

        setMessage("تم إنشاء الحساب. تحقق من بريدك الإلكتروني ثم سجّل دخولك.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      setMessage(error.message || "حدث خطأ. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page} dir="rtl">
      <section style={styles.card}>
        <div style={styles.logo}>W</div>
        <p style={styles.kicker}>WASSAL AI</p>
        <h1 style={styles.title}>
          {mode === "login" ? "أهلًا بعودتك" : "أنشئ حساب Wassal"}
        </h1>

        <p style={styles.subtitle}>
          {mode === "login"
            ? "سجّل دخولك لإدارة وكلاءك ومحادثات عملائك."
            : "ابدأ بإنشاء فريقك الذكي خلال دقائق."}
        </p>

        <form onSubmit={submit} style={styles.form}>
          {mode === "signup" && (
            <>
              <label style={styles.label}>
                الاسم الكامل
                <input
                  style={styles.input}
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="مثال: محمد أحمد"
                  required
                />
              </label>

              <label style={styles.label}>
                اسم الشركة
                <input
                  style={styles.input}
                  value={workspaceName}
                  onChange={(event) => setWorkspaceName(event.target.value)}
                  placeholder="مثال: Wassal Demo"
                />
              </label>
            </>
          )}

          <label style={styles.label}>
            البريد الإلكتروني
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              required
            />
          </label>

          <label style={styles.label}>
            كلمة المرور
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="6 أحرف على الأقل"
              minLength={6}
              required
            />
          </label>

          {message && <p style={styles.message}>{message}</p>}

          <button type="submit" disabled={loading} style={styles.submit}>
            {loading
              ? "جاري التنفيذ..."
              : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء الحساب"}
          </button>
        </form>

        <button
          type="button"
          style={styles.switch}
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
        >
          {mode === "login"
            ? "ليس لديك حساب؟ أنشئ حسابًا جديدًا"
            : "لديك حساب بالفعل؟ سجّل الدخول"}
        </button>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top right, #213b7d 0%, transparent 35%), #05070d",
    color: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "430px",
    padding: "34px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    background: "rgba(14,18,30,0.9)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
  },
  logo: {
    width: "48px",
    height: "48px",
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #5b7cff, #35d8ff)",
    fontWeight: 900,
    fontSize: "24px",
  },
  kicker: {
    margin: "20px 0 6px",
    color: "#8190a8",
    fontSize: "12px",
    letterSpacing: "2px",
  },
  title: { margin: 0, fontSize: "28px" },
  subtitle: {
    margin: "10px 0 24px",
    color: "#a3aec2",
    lineHeight: 1.6,
  },
  form: { display: "grid", gap: "14px" },
  label: {
    display: "grid",
    gap: "7px",
    color: "#dce4f2",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 13px",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "10px",
    outline: "none",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "15px",
  },
  submit: {
    marginTop: "8px",
    border: 0,
    borderRadius: "10px",
    padding: "13px",
    background: "linear-gradient(135deg, #5b7cff, #35d8ff)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  switch: {
    width: "100%",
    marginTop: "16px",
    border: 0,
    background: "transparent",
    color: "#8fa7ff",
    cursor: "pointer",
  },
  message: {
    margin: 0,
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(105,130,255,0.12)",
    color: "#dbe4ff",
    lineHeight: 1.45,
  },
};
