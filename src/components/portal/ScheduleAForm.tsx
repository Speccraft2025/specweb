'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ScheduleAMaster } from '@/lib/types'
import { Plus, Trash2, Save } from 'lucide-react'

interface MasterRow {
  id?: string
  track_number: number
  song_title: string
  isrc_code: string
  dsp_release_date: string
  current_status: string
  historical_expenses_kes: number
}

export default function ScheduleAForm({
  contractId,
  initialMasters,
  disabled,
}: {
  contractId: string
  initialMasters: ScheduleAMaster[]
  disabled: boolean
}) {
  const [masters, setMasters] = useState<MasterRow[]>(
    initialMasters.length > 0
      ? initialMasters.map((m) => ({
          id: m.id,
          track_number: m.track_number,
          song_title: m.song_title,
          isrc_code: m.isrc_code || '',
          dsp_release_date: m.dsp_release_date || '',
          current_status: m.current_status || '',
          historical_expenses_kes: m.historical_expenses_kes,
        }))
      : Array.from({ length: 6 }, (_, i) => ({
          track_number: i + 1,
          song_title: '',
          isrc_code: '',
          dsp_release_date: '',
          current_status: '',
          historical_expenses_kes: 0,
        }))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function addRow() {
    setMasters((prev) => [
      ...prev,
      {
        track_number: prev.length + 1,
        song_title: '',
        isrc_code: '',
        dsp_release_date: '',
        current_status: '',
        historical_expenses_kes: 0,
      },
    ])
  }

  function removeRow(index: number) {
    setMasters((prev) => {
      const next = prev.filter((_, i) => i !== index)
      return next.map((m, i) => ({ ...m, track_number: i + 1 }))
    })
  }

  function updateRow(index: number, field: keyof MasterRow, value: string | number) {
    setMasters((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    )
  }

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    const filledMasters = masters.filter((m) => m.song_title.trim())

    for (const master of filledMasters) {
      if (master.id) {
        await supabase
          .from('schedule_a_masters')
          .update({
            song_title: master.song_title,
            isrc_code: master.isrc_code || null,
            dsp_release_date: master.dsp_release_date || null,
            current_status: master.current_status || null,
            historical_expenses_kes: master.historical_expenses_kes,
          })
          .eq('id', master.id)
      } else {
        const { data } = await supabase
          .from('schedule_a_masters')
          .insert({
            contract_id: contractId,
            track_number: master.track_number,
            song_title: master.song_title,
            isrc_code: master.isrc_code || null,
            dsp_release_date: master.dsp_release_date || null,
            current_status: master.current_status || null,
            historical_expenses_kes: master.historical_expenses_kes,
          })
          .select()
          .single()

        if (data) {
          master.id = data.id
        }
      }
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const total = masters.reduce((sum, m) => sum + (Number(m.historical_expenses_kes) || 0), 0)

  return (
    <div>
      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--gray)]">
              <th className="text-left py-2 px-2 text-[var(--text-muted)] font-medium w-10">#</th>
              <th className="text-left py-2 px-2 text-[var(--text-muted)] font-medium">Song Title</th>
              <th className="text-left py-2 px-2 text-[var(--text-muted)] font-medium">ISRC / Release Date</th>
              <th className="text-left py-2 px-2 text-[var(--text-muted)] font-medium">Status</th>
              <th className="text-right py-2 px-2 text-[var(--text-muted)] font-medium">Expenses (KES)</th>
              {!disabled && <th className="w-8" />}
            </tr>
          </thead>
          <tbody>
            {masters.map((master, i) => (
              <tr key={i} className="border-b border-[var(--gray)]/30">
                <td className="py-2 px-2 text-[var(--text-muted)]">{master.track_number}</td>
                <td className="py-2 px-2">
                  <input
                    type="text"
                    value={master.song_title}
                    onChange={(e) => updateRow(i, 'song_title', e.target.value)}
                    disabled={disabled}
                    placeholder="Song title"
                    className="w-full bg-transparent border-b border-transparent focus:border-[var(--gold)] text-white placeholder:text-[var(--text-muted)]/30 outline-none py-1 disabled:opacity-50"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="text"
                    value={master.isrc_code}
                    onChange={(e) => updateRow(i, 'isrc_code', e.target.value)}
                    disabled={disabled}
                    placeholder="ISRC / Date"
                    className="w-full bg-transparent border-b border-transparent focus:border-[var(--gold)] text-white placeholder:text-[var(--text-muted)]/30 outline-none py-1 disabled:opacity-50"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="text"
                    value={master.current_status}
                    onChange={(e) => updateRow(i, 'current_status', e.target.value)}
                    disabled={disabled}
                    placeholder="e.g., Distributed"
                    className="w-full bg-transparent border-b border-transparent focus:border-[var(--gold)] text-white placeholder:text-[var(--text-muted)]/30 outline-none py-1 disabled:opacity-50"
                  />
                </td>
                <td className="py-2 px-2">
                  <input
                    type="number"
                    value={master.historical_expenses_kes || ''}
                    onChange={(e) => updateRow(i, 'historical_expenses_kes', Number(e.target.value) || 0)}
                    disabled={disabled}
                    placeholder="0"
                    className="w-full bg-transparent border-b border-transparent focus:border-[var(--gold)] text-white text-right placeholder:text-[var(--text-muted)]/30 outline-none py-1 disabled:opacity-50"
                  />
                </td>
                {!disabled && (
                  <td className="py-2 px-1">
                    <button
                      onClick={() => removeRow(i)}
                      className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--gray)]">
        <p className="text-sm text-[var(--text-muted)]">
          Total Initial Opening Recoupable Balance: <strong className="text-white">KES {total.toLocaleString()}</strong>
        </p>
      </div>

      {!disabled && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={addRow}
            className="flex items-center gap-1.5 text-sm text-[var(--gold)] hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Add row
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-sm bg-[var(--dark-2)] border border-[var(--gray)] text-white px-4 py-2 rounded-lg hover:border-[var(--gold)] transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Schedule A'}
          </button>
        </div>
      )}

      <div className="mt-4 flex gap-8 text-xs text-[var(--text-muted)]">
        <p>Artist Initials: ________</p>
        <p>Company Representative Initials: ________</p>
      </div>
    </div>
  )
}
