import { FC, FormEventHandler } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { GlobeAltIcon } from "@heroicons/react/24/solid"
import { useSnapshot } from "valtio"
import clsx from "clsx"

import {
  DEFAULT_SURFACE_RIGHT_X,
  DEFAULT_SURFACE_UPPER_Y,
  ProcessedReport,
  state,
  updateSurface,
} from "@/components/state"
import InputField from "@/components/InputField"
import Panel from "@/components/Panel"

const onUpdateSurface: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault()

  const x = parseInt(event.currentTarget['x'].value)
  const y = parseInt(event.currentTarget['y'].value)

  updateSurface(x, y)
}

const UpdateSurfaceForm: FC = () => (
  <form className="grid grid-cols-2 gap-5" onSubmit={onUpdateSurface}>
    <InputField name="x" label="Right-X" type="number" min={1} defaultValue={DEFAULT_SURFACE_RIGHT_X} />
    <InputField name="y" label="Upper-Y" type="number" min={1} defaultValue={DEFAULT_SURFACE_UPPER_Y} />
    <button
      type="submit"
      className={clsx(
        'col-start-2',
        'flex items-center justify-center gap-2',
        'py-2.5 px-6 pr-8 rounded-md',
        'font-semibold',
        'bg-slate-200/50 hover:bg-slate-200/100',
        'text-slate-500/70 hover:text-slate-500/90',
        'disabled:cursor-not-allowed',
        'duration-75 ease-in-out',
      )}
    >
      Update
    </button>
  </form>
)

const ReportItem: FC<ProcessedReport> = ({ x, y, direction, isLost }) => (
  <div
    className={clsx(
      'flex items-center justify-start gap-1.5',
      'px-1.5 py-1.5 rounded-md',
      'font-mono',
      'border border-neutral-200/80 bg-white/40',
    )}
  >
    {[x, y, direction].map((v, i) => (
      <span
        key={i}
        className={clsx(
          'px-2.5 py-0.5 rounded-md',
          'bg-slate-500/5 text-neutral-500',
        )}
      >
        {v}
      </span>
    ))}
    {isLost && (
      <span
        className={clsx(
          'flex-grow flex items-center justify-center',
          'px-2.5 py-0.5 rounded-md',
          'bg-red-500/5 text-red-500/80',
        )}
      >
        LOST
      </span>
    )}
  </div>
)

const ReportInfoBanner: FC<{ show: boolean }> = ({ show }) => (
  <div
    className={clsx(
      'delay-500 duration-300 ease-in-out overflow-visible',
      show ? 'h-11 opacity-100' : 'h-0 opacity-0'
    )}
  >
    <div
      className={clsx(
        'flex items-center gap-2',
        'font-medium',
        'border',
        'bg-amber-200/30 text-amber-600/80 border-amber-500/20',
        'px-3 py-2 rounded-md',
        'select-none',
      )}
    >
      <InformationCircleIcon className="w-5 h-5 stroke-[2.5]" />
      No robots have reported back yet!
    </div>
  </div>
)

const ReportList: FC = () => {
  const {
    reports,
  } = useSnapshot(state)

  return (
    <div className="flex flex-col gap-1">
      <h6 className="font-medium text-neutral-400">Reports</h6>
      <div className="relative grid grid-cols-2 gap-3 min-h-0 max-h-48 overflow-scroll">
        {reports.map((report, index) => (
          <ReportItem key={index} {...report} />
        ))}
      </div>
      <ReportInfoBanner show={reports.length === 0} />
    </div>
  )
}

const PanelSurface: FC = () => (
  <Panel icon={GlobeAltIcon} title="Surface">
    <div className="flex flex-col gap-3">
      <UpdateSurfaceForm />
      <ReportList />
    </div>
  </Panel>
)

export default PanelSurface
