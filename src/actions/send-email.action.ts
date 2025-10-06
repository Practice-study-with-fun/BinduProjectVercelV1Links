"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
  heading: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;",
  link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Somrat - ${subject}`,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Verify your email to activate your virtual card
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="background-color:rgb(255,255,255);border-radius:16px;max-width:500px;margin-left:auto;margin-right:auto;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 0 #0000">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;padding-left:40px;padding-right:40px;padding-top:48px;padding-bottom:32px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:48px;margin-bottom:0px;margin:0px;line-height:24px;margin-top:0px;margin-left:0px;margin-right:0px">
                      🔐
                    </p>
                    <h1
                      style="color:rgb(17,24,39);font-size:24px;font-weight:700;margin:0px;margin-bottom:8px">
                      Verify Your Email
                    </h1>
                    <p
                      style="color:rgb(75,85,99);font-size:16px;margin:0px;line-height:24px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px">
                      One quick step to secure your virtual card
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding-left:40px;padding-right:40px;padding-bottom:48px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="color:rgb(55,65,81);font-size:16px;line-height:24px;margin-bottom:24px;text-align:center;margin-top:16px">
                      Hi there! Welcome to
                      <strong style="color:rgb(37,99,235)">SecureCard</strong>.
                      Please verify your email to get started.
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background-color:rgb(239,246,255);border-radius:12px;padding-left:24px;padding-right:24px;padding-top:20px;padding-bottom:20px;margin-bottom:32px;text-align:center">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="color:rgb(29,78,216);font-size:16px;font-weight:500;margin:0px;line-height:24px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px">
                              surjosharma8888@gmail.com
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="text-align:center;margin-bottom:32px">
                      <tbody>
                        <tr>
                          <td>
                            <a
                               href="${meta.link}" style="${styles.link}"
                              style="background-color:rgb(37,99,235);color:rgb(255,255,255);font-weight:600;font-size:16px;padding-left:40px;padding-right:40px;padding-top:16px;padding-bottom:16px;border-radius:12px;text-decoration-line:none;box-sizing:border-box;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px"
                              target="_blank"
                              ><span
                                ><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:24" hidden>&#8202;&#8202;&#8202;&#8202;</i><![endif]--></span
                              ><span
                                style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:12px"
                                >Verify Email Address</span
                              ><span
                                ><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span
                              > </a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="text-align:center;margin-bottom:32px">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="color:rgb(75,85,99);font-size:14px;line-height:20px;margin-bottom:16px;margin-top:16px">
                              Once verified, you can:
                            </p>
                            <p
                              style="color:rgb(55,65,81);font-size:14px;line-height:22px;margin-top:16px;margin-bottom:16px">
                              ✨ Create virtual cards instantly<br />🔒 Enjoy
                              bank-level security<br />📱 Manage everything from
                              your phone
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="background-color:rgb(249,250,251);border-radius:8px;padding-left:20px;padding-right:20px;padding-top:16px;padding-bottom:16px;margin-bottom:24px">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="color:rgb(75,85,99);font-size:12px;text-align:center;margin:0px;line-height:24px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px">
                              Button not working?
                              <a
                                
                                style="color:rgb(37,99,235);text-decoration-line:none"
                                target="_blank"
                                >Click here</a
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="color:rgb(107,114,128);font-size:13px;text-align:center;line-height:24px;margin-top:16px;margin-bottom:16px">
                      This link expires in 24 hours for security
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color:rgb(249,250,251);padding-left:40px;padding-right:40px;padding-top:24px;padding-bottom:24px;border-bottom-right-radius:16px;border-bottom-left-radius:16px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="color:rgb(107,114,128);font-size:12px;margin:0px;margin-bottom:8px;line-height:24px;margin-top:0px;margin-left:0px;margin-right:0px">
                      © 2024
                      <!-- -->SecureCard
                    </p>
                    <p
                      style="color:rgb(156,163,175);font-size:11px;margin:0px;line-height:24px;margin-top:0px;margin-bottom:0px;margin-left:0px;margin-right:0px">
                      <a
                        href="#"
                        style="color:rgb(156,163,175);text-decoration-line:none"
                        target="_blank"
                        >Unsubscribe</a
                      >
                      •<a
                        href="#"
                        style="color:rgb(156,163,175);margin-left:8px;text-decoration-line:none"
                        target="_blank"
                        >Privacy</a
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>

    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}
// <a href="${meta.link}" style="${styles.link}">Click here</a>