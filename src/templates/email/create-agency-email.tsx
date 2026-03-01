import * as React from "react";

interface AgencyCreatedEmailProps {
  ownerName: string;
  agencyName: string;
  dashboardUrl: string;
  supportEmail?: string;
}

const CreateAgencyEmail: React.FC<AgencyCreatedEmailProps> = ({
  ownerName,
  agencyName,
  dashboardUrl,
  supportEmail = "support@yourdomain.com",
}) => {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#f4f6f8",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ backgroundColor: "#f4f6f8", padding: "40px 0" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#111827",
                          padding: "24px",
                          textAlign: "center",
                          color: "#ffffff",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        🎉 Agency Successfully Created
                      </td>
                    </tr>

                    {/* Content */}
                    <tr>
                      <td style={{ padding: "32px" }}>
                        <p style={{ fontSize: "16px", margin: "0 0 16px" }}>
                          Hi {ownerName},
                        </p>

                        <p style={{ fontSize: "16px", margin: "0 0 16px" }}>
                          Congratulations! Your agency{" "}
                          <strong>{agencyName}</strong> has been successfully
                          created and is now ready to use.
                        </p>

                        <p style={{ fontSize: "16px", margin: "0 0 24px" }}>
                          You can access your dashboard to start managing your
                          projects, team members, and clients.
                        </p>

                        {/* CTA Button */}
                        <table
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ margin: "0 auto 24px" }}
                        >
                          <tbody>
                            <tr>
                              <td align="center">
                                <a
                                  href={dashboardUrl}
                                  style={{
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    padding: "12px 24px",
                                    textDecoration: "none",
                                    borderRadius: "6px",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                  }}
                                >
                                  Go to Dashboard
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p style={{ fontSize: "14px", color: "#6b7280" }}>
                          If you have any questions, feel free to reach out to
                          us at{" "}
                          <a
                            href={`mailto:${supportEmail}`}
                            style={{ color: "#2563eb" }}
                          >
                            {supportEmail}
                          </a>
                          .
                        </p>

                        <p style={{ fontSize: "16px", marginTop: "24px" }}>
                          Best regards,
                          <br />
                          The Team
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#f9fafb",
                          padding: "20px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: "#9ca3af",
                        }}
                      >
                        © {new Date().getFullYear()} Your Company. All rights
                        reserved.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default CreateAgencyEmail;
