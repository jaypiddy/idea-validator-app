'use client';
import { useFormContext } from 'react-hook-form';

export default function StepSystems() {
    const { register } = useFormContext();

    return (
        <div>
            <div className="wiz-head">
                <h2 className="wiz-h">Step 3 &middot; Systems &amp; Adoption</h2>
                <p className="wiz-lead">For internal tools, this is where the real risk lives &mdash; not the market.</p>
            </div>

            <div className="wiz-fields">
                <div className="wiz-field">
                    <label>What does this replace today &mdash; manual process, spreadsheet, or legacy system?</label>
                    <p className="wiz-hint">
                        Replacing a spreadsheet is a clean slate. Replacing a legacy system means data migration, parity expectations, and cut-over risk.
                    </p>
                    <textarea
                        {...register('replaces', { required: true })}
                        placeholder="e.g. A shared Excel tracker plus a 10-year-old internal Access database..."
                    />
                </div>

                <div className="wiz-field">
                    <label>What systems must it connect to?</label>
                    <p className="wiz-hint">
                        Integrations are the #1 hidden cost in internal tools. Each system &mdash; SSO, an ERP, an internal API &mdash; adds surface area, auth complexity, and dependency risk.
                    </p>
                    <textarea
                        {...register('integrations', { required: true })}
                        placeholder="e.g. Okta SSO, Salesforce, an internal Postgres DB, and NetSuite for exports"
                    />
                </div>

                <div className="wiz-field">
                    <label>What has to change in how people work &mdash; and who drives that adoption?</label>
                    <p className="wiz-hint">
                        Internal tools fail on adoption, not tech. Mandated change with an executive sponsor is very different from hoping busy teams opt in.
                    </p>
                    <textarea
                        {...register('adoption', { required: true })}
                        placeholder="e.g. Managers must approve in-app instead of by email; the COO is mandating it"
                    />
                </div>

                <div className="wiz-field">
                    <label>Any security, compliance, or data-governance requirements?</label>
                    <p className="wiz-hint">
                        SSO, audit logs, PII handling, and data residency aren&apos;t features you add later &mdash; they shape the architecture from day one.
                    </p>
                    <input
                        {...register('compliance', { required: true })}
                        placeholder="e.g. SSO + role-based access, audit log, handles employee PII (SOC 2)"
                    />
                </div>
            </div>
        </div>
    );
}
