import { createContext, ReactNode, useContext, useState } from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'

export interface AlertContext {
  show: (message: string, type?: AlertType) => void
}

export const AlertContext = createContext<AlertContext>({
  show: () => {},
})

export type AlertType = 'error' | 'success' | 'warning'

interface Alert {
  message: string
  type: AlertType
  id: Symbol
}

const ALERT_DURATION = 5000

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  const show = (message: string, type: AlertType = 'success') => {
    const id = Symbol()
    setAlerts((curr) => [...curr, { message, type, id }])

    setTimeout(() => {
      setAlerts((curr) => curr.filter((alert) => alert.id !== id))
    }, ALERT_DURATION)
  }

  return (
    <AlertContext.Provider value={{ show }}>
      {children}
      <div className="fixed right-4 bottom-4 flex-col items-right pointer-events-none z-50">
        {alerts.map((alert, index) => (
          <div
            style={{ zIndex: 1000 }}
            key={index}
            className={`h-12 slide-in rounded-lg text-sm text-white shadow-lg flex items-center px-4 gap-3 mt-4 ${
              alert.type === 'error'
                ? 'bg-red-500'
                : alert.type === 'warning'
                  ? 'bg-amber-600'
                  : 'bg-green-600'
            }`}
          >
            <FaTriangleExclamation size={16} />
            <div className="min-w-64 w-fit">{alert.message}</div>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  )
}

export const useAlertContext = () => useContext(AlertContext)
