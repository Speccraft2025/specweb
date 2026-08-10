'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Artist, Contract, Signature, ScheduleAMaster } from '@/lib/types'
import SignaturePad from './SignaturePad'
import ScheduleAForm from './ScheduleAForm'
import { CheckCircle, AlertTriangle, FileText, ChevronDown, ChevronUp } from 'lucide-react'

export default function ContractViewer({
  artist,
  contract,
  signatures,
  scheduleA,
}: {
  artist: Artist
  contract?: Contract
  signatures: Signature[]
  scheduleA: ScheduleAMaster[]
}) {
  const [showSignature, setShowSignature] = useState(false)
  const [ilaAcknowledged, setIlaAcknowledged] = useState(false)
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(
    signatures.some((s) => s.signer_type === 'artist')
  )
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const artistSig = signatures.find((s) => s.signer_type === 'artist')
  const isSigned = signed || !!artistSig

  function toggleSection(n: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  function expandAll() {
    setExpandedSections(new Set(Array.from({ length: 27 }, (_, i) => i + 1)))
  }

  async function handleSign(signatureData: string) {
    if (!contract) return
    setSigning(true)
    const supabase = createClient()

    const { error } = await supabase.from('signatures').insert({
      contract_id: contract.id,
      signer_type: 'artist',
      signer_name: artist.full_legal_name,
      signature_data: signatureData,
      ip_address: null,
      user_agent: navigator.userAgent,
    })

    if (!error) {
      await supabase
        .from('contracts')
        .update({ status: 'signed', signed_at: new Date().toISOString() })
        .eq('id', contract.id)

      await supabase.from('ila_acknowledgments').insert({
        contract_id: contract.id,
        artist_id: artist.id,
      })

      setSigned(true)
      setShowSignature(false)
    }

    setSigning(false)
  }

  if (!contract) {
    return (
      <div className="text-center py-20">
        <FileText className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">No contract assigned</h2>
        <p className="text-[var(--text-muted)]">
          Your contract is being prepared. You&apos;ll be notified once it&apos;s ready for review.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Artist Agreement</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            Version {contract.version} &middot; Recording, Distribution & Management
          </p>
        </div>
        {isSigned && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/10 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Signed
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={expandAll}
          className="text-xs text-[var(--gold)] hover:underline"
        >
          Expand all sections
        </button>
        <span className="text-[var(--text-muted)]">|</span>
        <button
          onClick={() => setExpandedSections(new Set())}
          className="text-xs text-[var(--text-muted)] hover:underline"
        >
          Collapse all
        </button>
      </div>

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl overflow-hidden">
        <div className="p-6 sm:p-8 contract-text space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-white uppercase tracking-wide">
              Artist Recording, Distribution & Management Agreement
            </h2>
            <p className="text-[var(--text-muted)] text-sm mt-1">(Version 2.3)</p>
          </div>

          <div className="text-sm text-[var(--text-muted)] leading-relaxed space-y-4">
            <p>
              This Artist Partnership, Recording, Distribution & Management Agreement (the <strong className="text-white">&quot;Agreement&quot;</strong>) is
              entered into and made effective as of{' '}
              <span className="border-b border-dashed border-[var(--gold)] text-[var(--gold)] px-1">
                {contract.effective_date || '________________'}
              </span>{' '}
              (the <strong className="text-white">&quot;Effective Date&quot;</strong>), by and between:
            </p>

            <p>
              <strong className="text-white">SPEC CRAFT MEDIA LTD.</strong>, a private limited liability company incorporated under the laws of
              the Republic of Kenya, with its registered office in Nairobi, Kenya (hereinafter referred to as the{' '}
              <strong className="text-white">&quot;Company&quot;</strong>);
            </p>

            <p>AND</p>

            <p>
              <span className="border-b border-dashed border-[var(--gold)] text-[var(--gold)] px-1">
                {artist.full_legal_name || '________________'}
              </span>
              , an individual of{' '}
              <span className="text-white">{artist.nationality || 'Kenyan'}</span> nationality,
              holder of National Identity Card / Passport Number{' '}
              <span className="border-b border-dashed border-[var(--gold)] text-[var(--gold)] px-1">
                {artist.national_id_number || artist.passport_number || '________________'}
              </span>
              , residing at{' '}
              <span className="border-b border-dashed border-[var(--gold)] text-[var(--gold)] px-1">
                {artist.residential_address || '________________'}
              </span>{' '}
              and professionally known as{' '}
              <strong className="text-white">&quot;{artist.stage_name || '________________'}&quot;</strong>{' '}
              (hereinafter referred to as the <strong className="text-white">&quot;Artist&quot;</strong>).
            </p>

            <p>
              The Company and the Artist may collectively be referred to as the <strong className="text-white">&quot;Parties&quot;</strong> and individually as a <strong className="text-white">&quot;Party.&quot;</strong>
            </p>
          </div>

          {/* PREAMBLE */}
          <ContractSection title="PREAMBLE" number={0} expanded={expandedSections.has(0)} onToggle={() => toggleSection(0)}>
            <p><strong className="text-white">WHEREAS</strong>, the Company operates an independent entertainment media business providing professional sound recording, digital distribution, marketing, content creation, publishing administration, and talent management services within the music industry;</p>
            <p><strong className="text-white">WHEREAS</strong>, the Artist is an independent, professional performing artist, musician, and songwriter possessing unique creative talents, technical skills, and intellectual property;</p>
            <p><strong className="text-white">WHEREAS</strong>, the Parties desire to establish a collaborative commercial partnership under a label, distribution, and management framework whereby the Company invests its services, infrastructure, and capital to develop, record, exploit, and manage the Artist&apos;s professional career in exchange for master ownership, revenue participation, and expense recoupment as explicitly set forth herein;</p>
            <p><strong className="text-white">NOW, THEREFORE</strong>, in consideration of the mutual covenants, premises, and monetary allocations contained in this Agreement, the sufficiency of which is hereby acknowledged, the Parties agree as follows:</p>
          </ContractSection>

          {/* Section 1 */}
          <ContractSection title="1. DEFINITIONS AND INTERPRETATION" number={1} expanded={expandedSections.has(1)} onToggle={() => toggleSection(1)}>
            <p><strong className="text-white">1.1 Definitions</strong> In this Agreement, unless the context otherwise requires, the following terms shall have the meanings assigned to them below:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">&quot;Artist Investment Ledger&quot;</strong> means the itemized, running accounting record maintained by the Company tracking all Recoupable Expenses advanced or incurred by the Company for the production, marketing, distribution, and management of the Artist and the Masters.</li>
              <li><strong className="text-white">&quot;Audio-Visual Derivative&quot;</strong> means any synchronized visual recording embodying a Master, including but not limited to official music videos, lyric videos, behind-the-scenes content, short-form promotional videos (e.g., TikToks, Instagram Reels, YouTube Shorts), and concert recordings.</li>
              <li><strong className="text-white">&quot;Commercial Release&quot;</strong> means the formal public availability of a Master for commercial exploitation via digital, physical, or mobile transmission, including but not limited to Streaming and Downloads.</li>
              <li><strong className="text-white">&quot;Digital Service Provider&quot; or &quot;DSP&quot;</strong> means any digital music platform, retailer, streaming service, or video hosting network, including but not limited to Spotify, Apple Music, YouTube, Boomplay, Audiomack, Amazon Music, and Deezer.</li>
              <li><strong className="text-white">&quot;Delivery&quot; or &quot;Delivered&quot;</strong> means the submission by the Artist to the Company of fully edited, mixed, and mastered multi-track sound recordings in an uncompressed high-resolution digital format (minimum 24-bit / 44.1kHz WAV) that comply with the Technical and Commercial Standards specified herein, alongside completed metadata, split sheets, and necessary clearances.</li>
              <li><strong className="text-white">&quot;Download&quot;</strong> means the digital transmission of a sound recording resulting in the retention of a local copy by a consumer for playback.</li>
              <li><strong className="text-white">&quot;Gross Revenue&quot;</strong> means all income, receipts, and monies actually received by or credited to the Company or its subsidiaries worldwide directly derived from the commercial exploitation, licensing, performance, or use of the Masters, Audio-Visual Derivatives, or Artist-related opportunities before any deduction of operating expenses, label shares, or administration fees.</li>
              <li><strong className="text-white">&quot;Incapacity&quot;</strong> means any permanent or long-term physical, mental, or psychological medical condition, certified by a certified medical practitioner in Kenya, which renders the Artist incapable of performing, recording, or fulfilling their material creative and professional obligations under this Agreement for a continuous period exceeding ninety (90) days.</li>
              <li><strong className="text-white">&quot;Initial Term&quot;</strong> means the period of twelve (12) calendar months commencing on the Effective Date.</li>
              <li><strong className="text-white">&quot;Master&quot; or &quot;Masters&quot;</strong> means any pre-existing or newly created original studio sound recording of a musical composition embodying the performance of the Artist, inclusive of the underlying performance, tracking, and captured signal, intended for commercial release.</li>
              <li><strong className="text-white">&quot;Net Revenue&quot;</strong> means Gross Revenue actually received by the Company from the exploitation of the Masters and Audio-Visual Derivatives, less the following direct, verifiable third-party deductions:
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Standard commissions, fees, or distribution percentages retained by third-party Digital Service Providers (DSPs) or intermediate digital distributors;</li>
                  <li>Payment processor fees, transaction charges, and currency conversion fees directly linked to income collection;</li>
                  <li>Mandatory statutory withholding taxes, mechanical royalties payable to third-party publishers or societies, and mechanical reproduction levies arising directly from the sale or streaming of the Masters; and</li>
                  <li>Approved third-party expenses directly incurred in the manufacturing or physical distribution of the Masters, where applicable.</li>
                </ol>
              </li>
              <li><strong className="text-white">&quot;Recoupable Expenses&quot;</strong> means all documented, direct, and verified out-of-pocket costs and advances paid or incurred by the Company in connection with the production, engineering, mixing, mastering, video production, marketing, advertising, paid promotions, distribution, and third-party professional services for the Artist, which are loaded onto the Artist Investment Ledger for recovery from Net Revenue.</li>
              <li><strong className="text-white">&quot;Streaming&quot;</strong> means the digital transmission of an audio or audio-visual file via the internet or mobile networks for real-time playback by an end-user, without permanent local retention.</li>
              <li><strong className="text-white">&quot;Technical and Commercial Standards&quot;</strong> means a high-quality production standard suitable for professional broadcast, cinematic integration, sync licensing, and seamless delivery to major international DSPs, which must be commercially viable, structurally competitive, and reflective of the Artist&apos;s professional brand.</li>
              <li><strong className="text-white">&quot;Term&quot;</strong> means the Initial Term together with any Subsequent Renewal Periods mutually agreed in writing by the Parties.</li>
            </ul>
            <p><strong className="text-white">1.2 Interpretation</strong> In this Agreement:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Headings are inserted for convenience only and shall not affect the interpretation of this Agreement.</li>
              <li>References to the singular include the plural and vice versa; references to any gender include all genders.</li>
              <li>References to statutory provisions or regulations include any amendments, modifications, or re-enactments thereof under Kenyan law.</li>
              <li>The words &quot;include&quot; or &quot;including&quot; shall be construed without limitation.</li>
            </ul>
          </ContractSection>

          {/* Section 2 */}
          <ContractSection title="2. TERM & RENEWAL" number={2} expanded={expandedSections.has(2)} onToggle={() => toggleSection(2)}>
            <p><strong className="text-white">2.1 Initial Term</strong> This Agreement shall commence on the Effective Date and shall remain in full force and effect for an Initial Term of twelve (12) months, unless terminated earlier in strict compliance with Section 16 of this Agreement.</p>
            <p><strong className="text-white">2.2 Renewal</strong> Upon the expiration of the Initial Term, this Agreement shall not automatically renew. Any extension or renewal of the contract shall occur exclusively by mutual written agreement signed by the authorized representatives of both Parties (a <strong className="text-white">&quot;Subsequent Renewal Period&quot;</strong>) at least thirty (30) days prior to the expiration of the current term.</p>
            <p><strong className="text-white">2.3 Termination Notice Post-Term</strong> Subject to any survival clauses, post-term exploitation rights, and unresolved financial obligations detailed in this Agreement, either Party may terminate this Agreement after the expiration of the Initial Term by serving thirty (30) days&apos; prior written notice to the other Party.</p>
          </ContractSection>

          {/* Section 3 */}
          <ContractSection title="3. SCOPE OF AGREEMENT, EXCLUSIVITY & ARTIST CREATIVE FREEDOM" number={3} expanded={expandedSections.has(3)} onToggle={() => toggleSection(3)}>
            <p><strong className="text-white">3.1 Contractual Scope and Covered Assets</strong> Only Masters delivered to and accepted by the Company under this Agreement, together with Schedule A Masters and Company-funded Masters, shall be governed by this Agreement. This Agreement does not automatically capture or acquire rights to every sound recording made by the Artist during the Term. Any sound recording created independently by the Artist during the Term that is completely unlinked from Company financing, has not been delivered to the Company, and is not a Schedule A Master, shall remain outside the scope of this Agreement, subject explicitly to the Company&apos;s Right of First Refusal under Section 5.</p>
            <p><strong className="text-white">3.2 Commercial Release Exclusivity for Covered Masters</strong> For all Masters and Audio-Visual Derivatives governed by this Agreement (as specified in Section 3.1), the Artist grants to the Company the exclusive worldwide right to commercially release, distribute, stream, broadcast, license, and exploit such works. The Artist shall not commercially release, market, distribute, or license any sound recordings or associated video works governed by this Agreement through any other record label, distributor, platform, or independent channel without the express, prior written consent of the Company.</p>
            <p><strong className="text-white">3.3 Recording and Production Freedom</strong> The Artist is not required to record exclusively at facilities owned, operated, or designated by Spec Craft Media Ltd. The Artist is expressly permitted to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Record tracks in independent, third-party recording studios;</li>
              <li>Work, write, and record with third-party music producers;</li>
              <li>Engage independent third-party audio, mixing, and mastering engineers;</li>
              <li>Collaborate with other independent or signed recording artists, subject to Section 3.5;</li>
              <li>Perform live concerts, public showcases, and broadcast performances; and</li>
              <li>Create entirely independent recordings and engage in other lawful business activities, brand sponsorships, and creative ventures;</li>
              <li><em>Provided always</em> that such activities do not use Company funding or resources, and do not infringe upon, delay, or violate the Company&apos;s exclusive rights in Company-owned or Company-controlled Masters governed by this Agreement.</li>
            </ul>
            <p><strong className="text-white">3.4 Preservation of Label Rights</strong> The recording and production freedoms set forth in Section 3.3 are strictly subject to the condition that such activities do not impair the exclusive release, distribution, and ownership rights granted to the Company in relation to covered Masters. Freedom of recording independent tracks does not override the Company&apos;s exclusive rights in covered Masters.</p>
            <p><strong className="text-white">3.5 Third-Party Guest Collaborations</strong> The Artist may perform as a guest featured artist on sound recordings owned by third-party labels or independent artists, provided that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Artist gives the Company prior written notice of the collaboration;</li>
              <li>The collaboration does not interfere with the Artist&apos;s delivery obligations under Section 4; and</li>
              <li>The third-party label or artist secures standard &quot;side-artist&quot; clearances from the Company, which clearances shall not be unreasonably withheld, conditioned, or delayed, provided that such release does not conflict with the Company&apos;s release schedule for covered Masters.</li>
            </ul>
          </ContractSection>

          {/* Section 4 */}
          <ContractSection title="4. DELIVERY COMMITMENT, MINIMUM STANDARDS & ACCEPTANCE" number={4} expanded={expandedSections.has(4)} onToggle={() => toggleSection(4)}>
            <p><strong className="text-white">4.1 Annual Delivery Quota</strong> The Artist shall deliver to the Company a minimum of twelve (12) new, original, unreleased Masters per contract year during the Term (the <strong className="text-white">&quot;Annual Delivery Quota&quot;</strong>).</p>
            <p><strong className="text-white">4.2 Technical and Commercial Standards</strong> Every Master delivered by the Artist must meet the Technical and Commercial Standards defined in Section 1.1. The Company reserves the right to reject any Master that fails to meet these criteria, including recordings with technical defects, poor mix translation, uncleared structural samples, or elements that create substantial legal liability for defamation or copyright infringement.</p>
            <p><strong className="text-white">4.3 Delivery Documentation and Acceptance Process</strong> A Master shall not be deemed &quot;Delivered&quot; under this Agreement until the Artist has provided:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The high-resolution, uncompressed master audio files;</li>
              <li>Fully populated and accurate metadata sheets (including legal names of songwriters, producers, and performers);</li>
              <li>Signed, legally binding split sheets for publishing verification; and</li>
              <li>Written, fully executed third-party clearances and waivers for any underlying samples, interpolations, or guest performances.</li>
            </ul>
            <p>The Company shall have fourteen (14) business days from the physical or digital receipt of the complete files and documentation to audit the submission. Within this period, the Company must notify the Artist in writing of either its formal acceptance or its rejection based on specified technical or commercial defects. If the Company fails to issue a written rejection within fourteen (14) business days, the Master shall be deemed accepted. If rejected, the Artist shall have fourteen (14) business days to remediate the identified defects and re-deliver the Master for evaluation.</p>
            <p><strong className="text-white">4.4 Additional Masters</strong> The Artist may submit Masters exceeding the Annual Delivery Quota to build their commercial catalog. However, the commercial release, promotional funding, and marketing deployment of any Master beyond the initial twelve (12) shall remain within the sole discretion of the Company and shall be subject to budget availability on the Artist Investment Ledger.</p>
            <p><strong className="text-white">4.5 Release Scheduling</strong> While the production and delivery timeline shall be jointly consulted between the Parties to align with marketing strategies, the final decision regarding the exact release date, platform sequencing, and geographical prioritizing of all Masters and Audio-Visual Derivatives governed by this Agreement rests exclusively with the Company.</p>
            <p><strong className="text-white">4.6 Treatment of Schedule &apos;A&apos; Pre-Existing Masters</strong> The pre-existing sound recordings listed in Schedule &apos;A&apos; of this Agreement are fully incorporated into this contract. The Parties explicitly agree that the Schedule &apos;A&apos; Masters <strong className="text-white">do not count</strong> toward the Artist&apos;s Annual Delivery Quota of twelve (12) new Masters for the Initial Term. The Artist remains unconditionally obligated to deliver twelve (12) entirely new, unreleased Masters during the contract year in addition to the pre-existing works incorporated via Schedule &apos;A&apos;.</p>
          </ContractSection>

          {/* Section 5 */}
          <ContractSection title="5. RIGHT OF FIRST REFUSAL ON NEW MASTERS" number={5} expanded={expandedSections.has(5)} onToggle={() => toggleSection(5)}>
            <p><strong className="text-white">5.1 Purpose and Trigger</strong> To protect the Company&apos;s substantial investment in the development, marketing, and brand equity of the Artist without imposing overreaching structural exclusivity on the Artist&apos;s creative output, the Artist hereby grants to the Company an exclusive Right of First Refusal (the <strong className="text-white">&quot;ROFR&quot;</strong>) on any and all new, original, unreleased Masters created, recorded, or conceived by the Artist during the Term that are not otherwise automatically governed by this Agreement under Section 3.1.</p>
            <p><strong className="text-white">5.2 Submission and Evaluation Notice</strong> Prior to releasing, executing a distribution deal, licensing, or pitching an independent Master to any third party, the Artist must first offer the Master to the Company by delivering a high-quality audio file accompanied by complete written metadata and composition split details (the <strong className="text-white">&quot;ROFR Submission Notice&quot;</strong>). Upon physical or digital receipt of the complete ROFR Submission Notice, the Company shall have an exclusive evaluation period of thirty (30) calendar days (the <strong className="text-white">&quot;Evaluation Period&quot;</strong>) to review the track&apos;s technical and commercial potential.</p>
            <p><strong className="text-white">5.3 Company Options and Exercise</strong> Within the 30-day Evaluation Period, the Company may:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Accept the Master:</strong> By delivering written notice of acceptance to the Artist, in which case the Master shall immediately become a covered asset governed by this Agreement, subject to all ownership, retroactive assignment, distribution, and recoupment frameworks detailed herein; or</li>
              <li><strong className="text-white">Decline the Master:</strong> By delivering a written waiver to the Artist, or by failing to respond in writing prior to the expiration of the 30-day Evaluation Period.</li>
            </ul>
            <p><strong className="text-white">5.4 Freedom of Independent Exploitation</strong> If the Company declines the track in writing or fails to respond within the 30-day Evaluation Period, the ROFR shall be deemed waived for that specific track. The Artist shall thereafter be completely free to release, distribute, license, or exploit that individual Master independently or through any third-party entity without Company ownership attaching to it. <em>Provided always</em> that the commercial terms obtained by the Artist from a third party for said track shall not be materially less favorable to the Artist than the baseline terms offered under this Agreement, and the distribution of such track shall not cause a material conflict with the release schedule of Masters covered under this Agreement.</p>
          </ContractSection>

          {/* Section 6 */}
          <ContractSection title="6. MASTER OWNERSHIP & RETROACTIVE ASSIGNMENT" number={6} expanded={expandedSections.has(6)} onToggle={() => toggleSection(6)}>
            <p><strong className="text-white">6.1 Master Ownership</strong> All Masters, Audio-Visual Derivatives, and parts thereof recorded, created, or delivered by the Artist that are governed by this Agreement under Section 3.1 shall be owned solely and exclusively by the Company upon their creation, worldwide and in perpetuity. This grant of ownership encompasses 100% of the Master sound recording copyright, neighboring rights, and exploitation rights, subject only to the recoupment obligations (Section 9), the revenue-sharing provisions (Section 13), and the buyback mechanism (Section 15) set forth herein.</p>
            <p><strong className="text-white">6.2 Exclusive Exploitation Rights</strong> The Company retains the exclusive right to exploit, stream, monetize, download, license for synchronization (in film, television, advertising, or video games), sample, edit, remix, and publicly perform the Masters governed by this Agreement, or to refrain from doing so, during the Term and thereafter, until such time as a formal transfer or buyback is executed in accordance with Section 15.</p>
            <p><strong className="text-white">6.3 Retroactive Assignment of Schedule &apos;A&apos; Masters</strong> The Artist hereby irrevocably, unconditionally, and retroactively assigns, transfers, and conveys to the Company 100% of the worldwide Master ownership, copyright, and exploitation rights for all pre-existing sound recordings listed in Schedule &apos;A&apos; of this Agreement. This assignment is effective retroactively from the respective dates of creation of each individual pre-existing Master.</p>
          </ContractSection>

          {/* Sections 7-27 abbreviated for readability but present */}
          <ContractSection title="7. DISTRIBUTION RIGHTS & METADATA MANAGEMENT" number={7} expanded={expandedSections.has(7)} onToggle={() => toggleSection(7)}>
            <p><strong className="text-white">7.1 Exclusive Worldwide Distribution Grant</strong> The Artist grants to the Company the exclusive worldwide right to manage, monetize, distribute, and exploit the Masters and Audio-Visual Derivatives governed by this Agreement via all media formats and distribution technologies now known or hereafter devised. This grant includes the exclusive right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ingest, upload, and manage delivery to all global DSPs (including Spotify, Apple Music, YouTube, Boomplay, Audiomack, Amazon Music, Deezer, and TikTok);</li>
              <li>Control digital distribution scheduling, windowing, and promotional pitching;</li>
              <li>Assign, edit, and control metadata, International Standard Recording Codes (ISRC), and Universal Product Codes (UPC);</li>
              <li>Claim, monetize, and manage digital video content via Content ID networks, YouTube channels, and automated fingerprinting registries; and</li>
              <li>Collect all revenues, royalties, and neighboring rights income generated by the exploitation of the covered Masters.</li>
            </ul>
            <p><strong className="text-white">7.2 Asset Consolidation and Platform Transfers</strong> The exclusive distribution grant encompasses all pre-existing Masters listed in Schedule &apos;A&apos;, effective retroactively from their creation dates. The Artist shall not independently distribute, upload, or monetize any Masters or Audio-Visual Derivatives governed by this Agreement. To facilitate the consolidation of these assets under the Company&apos;s network, the Artist agrees to execute all necessary platform transfers, digital distribution takedowns from old accounts, metadata updates, and label copies within seven (7) calendar days of the Effective Date.</p>
          </ContractSection>

          <ContractSection title="8. MUSIC PUBLISHING & COMPOSITION RIGHTS" number={8} expanded={expandedSections.has(8)} onToggle={() => toggleSection(8)}>
            <p><strong className="text-white">8.1 Reservation of Songwriter and Publishing Ownership</strong> The underlying musical compositions (including lyrics, melodies, arrangements, and chord progressions) contained within the Masters shall remain the sole and exclusive intellectual property of the respective songwriter(s) or their designated music publishers. Nothing in this Agreement shall be interpreted as an assignment or transfer of the underlying publishing copyright from the Artist to the Company, unless a separate, formal publishing agreement is executed.</p>
            <p><strong className="text-white">8.2 Co-Writing and Production Splits</strong> In instances where the Company, its in-house producers, or staff writers materially contribute to the songwriting, composition, or structural creation of a track, the underlying publishing splits shall be negotiated in good faith and formally documented via written split sheets executed by the contributing writers prior to the Commercial Release of the affected track.</p>
            <p><strong className="text-white">8.3 Publishing Administration</strong> The Company may offer optional publishing administration services to the Artist to manage mechanical collections, public performance tracking, and sync licensing for the underlying compositions. If the Parties desire to engage in publishing administration, the terms, fees, and territory shall be established under a separate written addendum to this Agreement.</p>
          </ContractSection>

          <ContractSection title="9. COMPANY SERVICES & RECOUPMENT FRAMEWORK" number={9} expanded={expandedSections.has(9)} onToggle={() => toggleSection(9)}>
            <p><strong className="text-white">9.1 Scope of Recoupable Services</strong> The Company may provide a comprehensive suite of professional services to develop the Artist&apos;s career. These services include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Recording studio access, creative production, audio tracking, and engineering;</li>
              <li>Professional mixing, mastering, and audio post-production;</li>
              <li>Global digital distribution, playlist pitching, and DSP account management;</li>
              <li>Marketing campaigns, paid media amplification, public relations, and radio promotion;</li>
              <li>Content creation, graphic design, and photography; and</li>
              <li>Branding, creative direction, management, and commercial business development.</li>
            </ul>
            <p><strong className="text-white">9.2 Recoupable Nature of Advances and Costs</strong> All direct, documented out-of-pocket costs, third-party invoices, creative advances, and production expenditures incurred by the Company in delivering the services listed in Section 9.1 shall be classified as Recoupable Expenses. These expenses shall be loaded directly onto the Artist Investment Ledger and shall be recovered exclusively from the Net Revenue generated by the exploitation of the Masters governed by this Agreement, in accordance with Section 13. Internal operational overhead, standard label administrative costs, and general company salaries shall not be treated as Recoupable Expenses.</p>
            <p><strong className="text-white">9.3 Expenditure Authorization Threshold</strong> The Company is authorized to spend up to 50,000 Kenyan Shillings (KES 50,000) on any single, third-party expense directly related to the production, marketing, or management of the Artist without prior approval. For any single third-party expense or financial commitment exceeding <strong className="text-white">50,000 KES</strong>, the Company must obtain the prior written or electronic approval (including email or confirmed WhatsApp text) of the Artist before incurring the debt. Any unauthorized expense exceeding this threshold shall be borne solely by the Company and shall not be loaded onto the Artist Investment Ledger as a Recoupable Expense.</p>
          </ContractSection>

          <ContractSection title="10. MANAGEMENT SERVICES & ANCILLARY APPOINTMENTS" number={10} expanded={expandedSections.has(10)} onToggle={() => toggleSection(10)}>
            <p><strong className="text-white">10.1 Primary Manager of Record</strong> The Company shall act as the Artist&apos;s primary, exclusive strategic talent manager of record globally during the Term of this Agreement. In this capacity, the Company shall maintain central control over global brand strategy, commercial business choices, primary corporate partnerships, and overall career planning.</p>
            <p><strong className="text-white">10.2 Sourcing and Engagement of Specialized Service Providers</strong> To enhance operational execution, the Artist is expressly permitted to engage external, specialized service providers, including independent booking agents, localized public relations (PR) agencies, specialized tour managers, independent brand consultants, and dedicated accountants or legal advisors. The appointment of any specialized provider shall be subject to strict conditions detailed in the Agreement.</p>
            <p><strong className="text-white">10.3 Essential Nature of Management Services</strong> The Artist explicitly acknowledges and agrees that the management services provided by the Company are central to the structural balance of this Agreement, and form a material part of the consideration for which the Artist has entered into this partnership.</p>
            <p><strong className="text-white">10.4 Conflict of Interest Waiver</strong> The Artist, having been advised of their right to seek Independent Legal Advice (ILA), explicitly, knowingly, and voluntarily waives any potential, actual, or perceived conflict of interest arising from the Company acting simultaneously as the exclusive Label, the exclusive Distributor, and the primary strategic Talent Manager under this single Agreement.</p>
          </ContractSection>

          <ContractSection title="11. OPPORTUNITIES, LIVE SHOWS & BRAND DEALS" number={11} expanded={expandedSections.has(11)} onToggle={() => toggleSection(11)}>
            <p><strong className="text-white">11.1 Company-Sourced Opportunities</strong> Where the Company directly sources, secures, negotiates, or closes commercial opportunities for the Artist during the Term&mdash;including live musical performances, concert bookings, brand endorsements, commercial sponsorships, media appearances, corporate partnerships, and merchandising arrangements&mdash;the gross revenue arising therefrom shall be allocated and split as follows:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Artist Share:</strong> Eighty Percent (<strong>80%</strong>) of gross revenue.</li>
              <li><strong className="text-white">Company Share:</strong> Twenty Percent (<strong>20%</strong>) of gross revenue.</li>
            </ul>
            <p><strong className="text-white">11.2 Artist-Sourced Opportunities</strong> Where the Artist independently sources, negotiates, and secures commercial opportunities entirely without the involvement, infrastructure, negotiation, or administrative assistance of the Company:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Artist shall retain One Hundred Percent (<strong>100%</strong>) of the gross revenue derived from such independent opportunity.</li>
            </ul>
            <p><strong className="text-white">11.3 Hybrid Opportunities</strong> Where a commercial opportunity is initially introduced or sourced by the Artist, but the Company contributes materially to its finalization by managing contract negotiations, structuring corporate compliance, handling legal execution, managing delivery logistics, or coordinating brand integration:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Artist Share:</strong> Eighty-Five Percent (<strong>85%</strong>) of gross revenue.</li>
              <li><strong className="text-white">Company Share:</strong> Fifteen Percent (<strong>15%</strong>) of gross revenue.</li>
            </ul>
          </ContractSection>

          <ContractSection title="12. RECOUPMENT MECHANISM & SCHEDULE 'A' BALANCES" number={12} expanded={expandedSections.has(12)} onToggle={() => toggleSection(12)}>
            <p><strong className="text-white">12.1 Maintenance of Artist Investment Ledger</strong> The Company shall maintain a clear, itemized, and transparent Artist Investment Ledger. The ledger shall systematically log all verified Recoupable Expenses, which are limited to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Studio booking fees, session musician payments, mixing, and mastering invoices;</li>
              <li>Audio-visual and music video production costs (including equipment hire, directors, and editors);</li>
              <li>Marketing campaigns, social media ad spend, PR agency retainers, and playlist promotion;</li>
              <li>Direct physical or digital distribution setup fees; and</li>
              <li>Approved third-party professional services authorized under Section 9.3.</li>
            </ul>
            <p><strong className="text-white">12.2 Documentation Requirement</strong> No expense, advance, or cost may be loaded onto the Artist Investment Ledger or deducted from revenues unless it is fully supported by written documentation, receipts, invoices, or electronic financial logs. Undocumented or generalized expenses shall not be recoupable.</p>
            <p><strong className="text-white">12.3 Onloading of Schedule &apos;A&apos; Historical Balances</strong> The Parties acknowledge that the Company has incurred historical expenses prior to the execution of this Agreement in producing, filming, distributing, and promoting the pre-existing Masters listed in Schedule &apos;A&apos;. It is explicitly agreed that all historical, documented expenses summarized in Schedule &apos;A&apos; shall be loaded onto the Artist Investment Ledger as the <em>initial opening recoupable balance</em> immediately upon the Effective Date of this Agreement. This opening balance must be fully recouped alongside subsequent project expenses before any music net revenues are split under Section 13.</p>
          </ContractSection>

          <ContractSection title="13. REVENUE SHARING (MUSIC)" number={13} expanded={expandedSections.has(13)} onToggle={() => toggleSection(13)}>
            <p><strong className="text-white">13.1 Post-Recoupment Revenue Split</strong> All Net Revenue (as defined in Section 1.1) derived from the exploitation and commercialization of the Masters and Audio-Visual Derivatives governed by this Agreement shall be allocated and distributed only <strong className="text-white">after full recoupment</strong> of the Artist Investment Ledger. Once the opening balance and all subsequent Recoupable Expenses on the Ledger reach a net-zero balance, all further Net Revenue shall be split and paid on a monthly or quarterly basis according to the following fixed allocation:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Artist Share:</strong> Sixty Percent (<strong>60%</strong>) of Net Revenue.</li>
              <li><strong className="text-white">Company Share:</strong> Forty Percent (<strong>40%</strong>) of Net Revenue.</li>
            </ul>
            <p><strong className="text-white">13.2 Scope of Application</strong> The 60/40 music revenue split applies universally to all forms of master exploitation income derived from covered Masters, including digital streaming, track and album downloads, YouTube monetization, Content ID networks, master synchronization licensing, and neighboring rights collections.</p>
            <p><strong className="text-white">13.3 Publishing Exclusion</strong> For the avoidance of doubt, underlying musical composition publishing royalties, performance rights organization (PRO) songwriter distributions (e.g., MCSK, PRISK, KAMP, or international equivalents), and mechanical royalties are governed separately and are completely excluded from the master revenue split detailed in this Section.</p>
          </ContractSection>

          <ContractSection title="14. CONTENT CREATION & MARKETING PARTICIPATION" number={14} expanded={expandedSections.has(14)} onToggle={() => toggleSection(14)}>
            <p><strong className="text-white">14.1 Active Promotional Participation</strong> The Artist recognizes that the commercial success of the Masters depends on active marketing and digital presence. Accordingly, the Artist agrees to actively cooperate and participate in promotional activities, including creating original short-form video content, participating in behind-the-scenes filming, attending scheduled press interviews, and engaging with label-directed marketing campaigns.</p>
            <p><strong className="text-white">14.2 Content Usage License</strong> The Artist grants the Company a worldwide, royalty-free, non-exclusive license during the Term and thereafter to use the Artist&apos;s name, approved likeness, biographical data, and any marketing content created during campaigns for the purpose of advertising, promoting, and distributing the Masters governed by this Agreement and the Artist&apos;s professional brand.</p>
            <p><strong className="text-white">14.3 Retention of Personal Account Ownership</strong> The Artist shall retain sole ownership, access, and control of their personal social media accounts, handles, and independently created personal lifestyle content. The Company shall not claim ownership over the Artist&apos;s personal digital profiles.</p>
          </ContractSection>

          <ContractSection title="15. BUYBACK OPTION & VALUATION FORMULA" number={15} expanded={expandedSections.has(15)} onToggle={() => toggleSection(15)}>
            <p><strong className="text-white">15.1 Eligibility and Window</strong> The Artist shall have the exclusive right to initiate a buyback of 100% of the ownership and copyrights of all Masters and Audio-Visual Derivatives governed by this Agreement (including Schedule &apos;A&apos; Masters). This buyback option may be exercised at any time <strong className="text-white">after the expiration of three (3) years</strong> from the Effective Date, by serving a sixty (60) days&apos; formal written notice of intent to buy back to the Company.</p>
            <p><strong className="text-white">15.2 Definitive Buyback Valuation Formula</strong> To execute the buyback and trigger the transfer of master ownership, the Artist must pay to the Company a lump-sum cash consideration calculated via the following clear and single methodology:</p>
            <p className="text-center text-white font-mono my-4">Buyback Purchase Price = U + (3 &times; A)</p>
            <p>Where:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">$U (Outstanding Unrecouped Balance):</strong> Means the total remaining unrecouped investment balance or debt outstanding on the Artist Investment Ledger at the closing date of the buyback transaction.</li>
              <li><strong className="text-white">$A (Average Annual Gross Revenue):</strong> Means the average annual <strong className="text-white">Gross Revenue</strong> generated specifically by the covered Masters over the two (2) fully completed calendar years (January 1 to December 31) immediately preceding the date of delivery of the buyback notice.</li>
            </ul>
            <p><strong className="text-white">15.3 Calculation of Average Annual Gross Revenue ($A)</strong> The Gross Revenue received or credited to the Company from the exploitation of the covered Masters during the two completed calendar years shall be added together, and the resulting total sum shall be divided by exactly two (2). Gross Revenue shall include all income collected before any deduction of intermediate digital distributor fees, intermediate DSP fees, operating expenses, or Company revenue shares.</p>
            <p><strong className="text-white">15.4 Transfer of Title</strong> Upon the Company&apos;s receipt of the full, cleared buyback payment calculated under this Section, the Company shall execute all necessary copyright assignments, metadata transfers, and administrative handovers to legally vest 100% of the Master ownership and distribution rights in the Artist or their designated entity.</p>
          </ContractSection>

          <ContractSection title="16. ACCOUNTING, ROYALTY REPORTING & AUDIT RIGHTS" number={16} expanded={expandedSections.has(16)} onToggle={() => toggleSection(16)}>
            <p><strong className="text-white">16.1 Reporting Frequency and Statements</strong> The Company shall render detailed, itemized financial statements to the Artist on a quarterly basis, within forty-five (45) days following the end of each calendar quarter. Each quarterly statement shall distinctly itemize Gross Revenues, permitted Net Revenue deductions, running updates to the Artist Investment Ledger, and the current balance of the Artist&apos;s account.</p>
            <p><strong className="text-white">16.2 Delivery of Statements and Payments</strong> Statements may be delivered to the Artist electronically via a secure email address or digital portal designated by the Artist. Any net revenue payments due to the Artist after full recoupment shall be paid simultaneously with the rendering of the statements via Electronic Funds Transfer (EFT), Mobile Money (M-Pesa), or direct bank deposit.</p>
            <p><strong className="text-white">16.3 Audit Rights</strong> The Artist shall have the right, at their own expense, to engage an independent Certified Public Accountant (CPA) to audit the Company&apos;s financial books, ledgers, and distribution receipts directly relating to the exploitation of the Artist&apos;s Masters. This audit right may be exercised <strong className="text-white">once per calendar year</strong>, provided that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Artist serves at least thirty (30) days&apos; prior written notice to the Company;</li>
              <li>The audit is conducted during the Company&apos;s regular business hours at its principal place of business in Kenya; and</li>
              <li>The audit does not unreasonably disrupt the Company&apos;s daily operations.</li>
            </ul>
            <p><strong className="text-white">16.4 Audit Discrepancies and Cost Shifting</strong> If an audit reveals an underpayment of royalties or overcharging of expenses to the detriment of the Artist, the Company shall promptly pay the deficiency within thirty (30) days. Furthermore, if a certified audit reveals that the Company has underpaid the Artist or overcharged the Ledger by an amount equal to or exceeding ten percent (10%) of the actual sums due for the audited period, the Company shall, in addition to correcting the balance, reimburse the Artist for the actual, reasonable out-of-pocket costs of the audit.</p>
          </ContractSection>

          <ContractSection title="17. FORCE MAJEURE" number={17} expanded={expandedSections.has(17)} onToggle={() => toggleSection(17)}>
            <p><strong className="text-white">17.1</strong> Neither Party shall be held liable or deemed in material breach of this Agreement for any delay, failure, or interruption in the performance of their obligations resulting directly from a Force Majeure Event, including natural disasters, acts of God, government declarations of emergency, national internet infrastructure failures, widespread DSP platform interruptions, wars, civil unrest, riots, strikes, or widespread pandemics completely restricting physical or digital commerce.</p>
            <p><strong className="text-white">17.2</strong> The Party affected by a Force Majeure Event shall provide prompt written notice to the other Party within seven (7) days of its occurrence, detailing the nature of the event and its projected impact on contract performance.</p>
            <p><strong className="text-white">17.3</strong> If a Force Majeure Event continuously prevents the performance of material obligations under this Agreement for a consecutive period exceeding ninety (90) calendar days, either Party may terminate this Agreement by giving fourteen (14) days&apos; written notice to the other Party, without further liability, subject to the survival of master ownership and recoupment balances.</p>
          </ContractSection>

          <ContractSection title="18. DEATH OR INCAPACITY" number={18} expanded={expandedSections.has(18)} onToggle={() => toggleSection(18)}>
            <p><strong className="text-white">18.1</strong> In the event of the Artist&apos;s death or verified Incapacity during the Term of this Agreement, the active delivery obligations for new Masters under Section 4 and the strategic management services under Section 10 shall automatically terminate.</p>
            <p><strong className="text-white">18.2</strong> The Artist&apos;s death or Incapacity shall not operate to reverse, terminate, or diminish the Company&apos;s sole and exclusive ownership of the Masters and Audio-Visual Derivatives governed by this Agreement. The Company retains the exclusive right, worldwide and in perpetuity, to exploit, stream, license, and distribute all existing delivered or pre-existing Masters.</p>
            <p><strong className="text-white">18.3</strong> Following the death or Incapacity of the Artist, the Company shall remain legally obligated to render quarterly accounting statements and distribute the Artist&apos;s 60% share of Net Revenues (post-recoupment) directly to the Artist&apos;s designated estate, legal heirs, executors, or court-appointed administrators, in strict compliance with the Law of Succession Act (Cap 160) of the Laws of Kenya. The Artist&apos;s estate shall also retain the right to execute the buyback option under Section 15.</p>
          </ContractSection>

          <ContractSection title="19. OPERATIONAL CONTINUITY & KEY PERSON CLAUSE" number={19} expanded={expandedSections.has(19)} onToggle={() => toggleSection(19)}>
            <p><strong className="text-white">19.1</strong> In the event that the Company entirely ceases its active day-to-day commercial music business operations, or completely halts its label, distribution, and management activities in Kenya for a continuous period exceeding ninety (90) consecutive calendar days (unrelated to a Force Majeure Event), the Artist shall have the right to serve a formal written notice of operational default on the Company.</p>
            <p><strong className="text-white">19.2</strong> If the Company fails to resume active business operations within thirty (30) calendar days following receipt of the operational default notice, the Artist shall be entitled to immediately terminate the primary talent management obligations set forth in Section 10 by serving a final written notice of partial termination.</p>
            <p><strong className="text-white">19.3</strong> Notwithstanding any partial termination of management obligations, the Company&apos;s 100% exclusive Master ownership and copyright control over all Masters and Audio-Visual Derivatives previously delivered, accepted, or incorporated under Schedule &apos;A&apos; shall survive intact, worldwide and in perpetuity; the Company&apos;s exclusive distribution rights and master exploitation frameworks for existing covered tracks shall survive completely unaffected; the Company&apos;s obligation to render quarterly accounting statements and pay the post-recoupment 60/40 music revenue split shall remain fully binding and enforceable; and the Artist&apos;s structural right to execute a full master buyback in accordance with Section 15 shall survive in full force and effect.</p>
          </ContractSection>

          <ContractSection title="20. TERMINATION & POST-TERM EXPLOITATION RIGHTS" number={20} expanded={expandedSections.has(20)} onToggle={() => toggleSection(20)}>
            <p><strong className="text-white">20.1 Grounds for Termination</strong> This Agreement may be formally terminated prior to the expiration of the Term under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Mutual Written Agreement:</strong> At any time by a written instrument executed by both Parties;</li>
              <li><strong className="text-white">Material Breach:</strong> By either Party if the other Party commits a material breach of any obligation, representation, or warranty under this Agreement, and fails to cure such breach within fourteen (14) calendar days following receipt of a detailed written notice specifying the breach; or</li>
              <li><strong className="text-white">Insolvency/Bankruptcy:</strong> By either Party if the other Party enters into liquidation, bankruptcy, or becomes insolvent under the laws of Kenya.</li>
            </ul>
            <p><strong className="text-white">20.2</strong> The expiration of the Initial Term or the formal termination of this Agreement for any reason (including material breach) shall not reverse, terminate, or divest the Company of its exclusive ownership of the Masters and Audio-Visual Derivatives governed by this Agreement; eliminate or erase the Artist&apos;s outstanding recoupment obligations on the Artist Investment Ledger; or extinguish the Company&apos;s obligation to pay the Artist their post-recoupment 60/40 revenue split for covered tracks.</p>
            <p><strong className="text-white">20.3 Commercially Balanced Post-Term Exploitation</strong> Notwithstanding the expiration or termination of the active Term, the Company shall retain the exclusive right to exploit, stream, and distribute all delivered and pre-existing Masters governed by this Agreement. This post-term exploitation is strictly conditioned upon the Company&apos;s ongoing compliance with the financial accounting requirements (Section 16) and the continuous payment of the revenue splits defined in Section 13. This exploitation right remains absolute until such time as the Artist or their estate successfully executes the buyback mechanism set forth in Section 15.</p>
          </ContractSection>

          <ContractSection title="21. CONFIDENTIALITY" number={21} expanded={expandedSections.has(21)} onToggle={() => toggleSection(21)}>
            <p><strong className="text-white">21.1</strong> Both Parties agree to maintain strict confidentiality and shall not disclose, disseminate, or publish to any third party any confidential business information acquired during the course of this partnership, including financial data, ledger balances, specific commercial terms, splits, unreleased music, and internal corporate communications.</p>
            <p><strong className="text-white">21.2</strong> The obligations of confidentiality shall not apply to disclosures made to legal counsel, professional financial accountants, or where mandated by a valid court order or regulatory authority within the Republic of Kenya.</p>
            <p><strong className="text-white">21.3</strong> The confidentiality covenants set forth in this Section shall survive the expiration or formal termination of this Agreement for a mandatory period of two (2) years.</p>
          </ContractSection>

          <ContractSection title="22. REPRESENTATIONS, WARRANTIES & INDEMNIFICATION" number={22} expanded={expandedSections.has(22)} onToggle={() => toggleSection(22)}>
            <p><strong className="text-white">22.1 Artist Schedule &apos;A&apos; Warranties</strong> The Artist explicitly represents, warrants, and covenants to the Company that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Artist is the sole, exclusive, and unencumbered owner or controller of 100% of the Master recording copyrights for all pre-existing sound recordings listed in Schedule &apos;A&apos; of this Agreement;</li>
              <li>No undisclosed co-owners, co-creators, producers, or financiers hold any legal or equitable interest in the Schedule &apos;A&apos; Masters;</li>
              <li>No undisclosed assignments, transfers, licenses, or liens have been granted or attached to the Schedule &apos;A&apos; Masters;</li>
              <li>There is no pending litigation, arbitration, administrative proceeding, or threatened legal claim of any nature affecting the Schedule &apos;A&apos; Masters;</li>
              <li>There are no known copyright disputes, sampling claims, or allegations of infringement raised by any third party regarding the underlying compositions or audio assets within Schedule &apos;A&apos;; and</li>
              <li>The Artist has full power and authority to execute this Agreement, and no conflicting recording, distribution, publishing, or management agreements impair or restrict the transfer of ownership and control to the Company.</li>
            </ul>
            <p><strong className="text-white">22.2 Mutual General Warranties</strong> Each Party warrants to the other that they have the full legal capacity to enter into and perform this Agreement, and that the execution of this contract does not breach any existing obligation or third-party agreement.</p>
            <p><strong className="text-white">22.3 Indemnification Clause</strong> The Artist hereby agrees to fully indemnify, defend, and hold harmless the Company, its directors, officers, employees, and permitted assigns from and against any and all third-party claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees and High Court costs) arising directly out of or resulting from a material breach of any representation, warranty, or covenant made by the Artist in this Agreement.</p>
          </ContractSection>

          <ContractSection title="23. DISPUTE RESOLUTION" number={23} expanded={expandedSections.has(23)} onToggle={() => toggleSection(23)}>
            <p><strong className="text-white">23.1 Amicable Negotiation</strong> In the event of any dispute, controversy, claim, or difference arising out of or relating to this Agreement, the Parties shall first attempt to resolve the matter through direct, good-faith, amicable negotiations within thirty (30) days of one Party serving a formal written dispute notice to the other.</p>
            <p><strong className="text-white">23.2 Mediation</strong> If the dispute remains unresolved through direct negotiation after thirty (30) days, the Parties agree to submit the matter to formal, confidential mediation under the auspices of the Strathmore Dispute Resolution Centre (SDRC) or an equivalent recognized mediation registry in Nairobi, Kenya.</p>
            <p><strong className="text-white">23.3 Litigation</strong> If mediation fails to resolve the dispute within sixty (60) days of its commencement, either Party may escalate the matter to the competent courts of the Republic of Kenya for final adjudication.</p>
          </ContractSection>

          <ContractSection title="24. GOVERNING LAW" number={24} expanded={expandedSections.has(24)} onToggle={() => toggleSection(24)}>
            <p>This Agreement, its validity, construction, interpretation, performance, and any disputes arising from it shall be governed by, construed, and enforced exclusively in accordance with the substantive and procedural laws of the <strong className="text-white">Republic of Kenya</strong>.</p>
          </ContractSection>

          <ContractSection title="25. SUPERSESSION & ENTIRE AGREEMENT" number={25} expanded={expandedSections.has(25)} onToggle={() => toggleSection(25)}>
            <p><strong className="text-white">25.1</strong> This Agreement constitutes the entire, integrated agreement and understanding between the Company and the Artist regarding the subject matter contained herein. It supersedes, replaces, cancels, and extinguishes in their entirety all prior oral agreements, verbal promises, and informal understandings; prior written agreements, heads of terms, memoranda of understanding (MOUs), and draft contracts; prior recording, studio, or label arrangements; prior digital or physical distribution agreements; prior talent management contracts or representative arrangements; and all prior revenue-sharing, royalty-allocation, or expense-recovery arrangements between the Parties relating specifically to the pre-existing Masters listed in Schedule &apos;A&apos;.</p>
            <p><strong className="text-white">25.2</strong> This clause is intentionally drafted to eliminate any future legal disputes, claims, or assertions of rights based on historical deals, handshake agreements, or past course of dealings between the Parties. No modification, amendment, or waiver of any provision of this Agreement shall be valid or legally binding unless it is made in writing and executed by the authorized signatories of both Parties.</p>
          </ContractSection>

          <ContractSection title="26. INDEPENDENT LEGAL ADVICE (ILA)" number={26} expanded={expandedSections.has(26)} onToggle={() => toggleSection(26)}>
            <p>The Artist explicitly confirms, acknowledges, and warrants by appending their signature and initialing below that they have been strongly advised of their right to seek independent legal representation from a qualified entertainment attorney of their own choosing, and have been offered ample time and opportunity to review, analyze, and seek Independent Legal Advice (ILA) concerning the legal and commercial consequences of every clause within this Agreement prior to executing it. The Artist confirms they enter into this partnership freely, voluntarily, and with a complete understanding of their rights and obligations.</p>
          </ContractSection>

          <ContractSection title="27. ELECTRONIC SIGNATURES & EXECUTION" number={27} expanded={expandedSections.has(27)} onToggle={() => toggleSection(27)}>
            <p>This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument. Delivery of an executed counterpart of a signature page to this Agreement by electronic mail (PDF format), DocuSign, or other verified electronic signature platform shall be fully legal, valid, binding, and enforceable under the Electronic Transactions Act of the Laws of Kenya.</p>
          </ContractSection>

          {/* Schedule A */}
          <div className="mt-10 pt-8 border-t border-[var(--gray)]">
            <h2 className="text-lg font-bold text-white mb-4">SCHEDULE A: PRE-EXISTING MASTERS</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              The Parties hereby agree that the following pre-existing sound recordings and associated historical production, marketing, and distribution expenses are formally incorporated into the scope of this Agreement (Version 2.3) pursuant to Sections 4.6, 6.3, 7.2, 12.3, and 22.1.
            </p>
            <ScheduleAForm
              contractId={contract.id}
              initialMasters={scheduleA}
              disabled={isSigned}
            />
          </div>

          {/* Signature Block */}
          <div className="mt-10 pt-8 border-t border-[var(--gray)]">
            <h2 className="text-lg font-bold text-white mb-6">SIGNATURES & EXECUTION</h2>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">For the Company: Spec Craft Media Ltd.</h3>
                <div className="space-y-2 text-sm text-[var(--text-muted)]">
                  <p>Authorized Representative Name: ________________</p>
                  <p>Title / Designation: ________________</p>
                  <p>Signature: ________________</p>
                  <p>Date: ________________</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">For the Artist: {artist.full_legal_name}</h3>
                <div className="space-y-2 text-sm text-[var(--text-muted)]">
                  <p>Professional/Stage Name: {artist.stage_name || '________________'}</p>
                  <p>National ID / Passport Number: {artist.national_id_number || artist.passport_number || '________________'}</p>
                </div>

                {isSigned ? (
                  <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
                      <CheckCircle className="w-4 h-4" />
                      Signed electronically
                    </div>
                    {artistSig && (
                      <>
                        <img
                          src={artistSig.signature_data}
                          alt="Artist signature"
                          className="max-h-20 mb-2"
                        />
                        <p className="text-xs text-[var(--text-muted)]">
                          Signed on {new Date(artistSig.signed_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-[var(--gold)]/5 border border-[var(--gold)]/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white font-medium mb-1">Independent Legal Advice (Section 26)</p>
                          <p className="text-xs text-[var(--text-muted)] mb-3">
                            By signing, you confirm that you have been advised of your right to seek independent legal representation and have had ample opportunity to review this agreement.
                          </p>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={ilaAcknowledged}
                              onChange={(e) => setIlaAcknowledged(e.target.checked)}
                              className="mt-0.5 accent-[var(--gold)]"
                            />
                            <span className="text-xs text-[var(--text-muted)]">
                              I acknowledge that I have been advised of my right to seek Independent Legal Advice (ILA) and enter into this agreement freely and voluntarily.
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {!showSignature ? (
                      <button
                        onClick={() => setShowSignature(true)}
                        disabled={!ilaAcknowledged}
                        className="w-full py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Sign Agreement
                      </button>
                    ) : (
                      <SignaturePad
                        onSign={handleSign}
                        onCancel={() => setShowSignature(false)}
                        signing={signing}
                        signerName={artist.full_legal_name}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContractSection({
  title,
  number,
  expanded,
  onToggle,
  children,
}: {
  title: string
  number: number
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-[var(--gray)]/50 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left group"
      >
        <h3 className="text-sm font-semibold text-white group-hover:text-[var(--gold)] transition-colors">
          {title}
        </h3>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}
