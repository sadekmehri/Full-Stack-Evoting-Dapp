import { toast } from 'react-toastify'

export const toastify = (
  type = 'error',
  message = 'Something wrong happened'
) => {
  const options = { theme: 'colored' }
  switch (type) {
    case 'error':
      toast.error(message, options)
      break
    case 'success':
      toast.success(message, options)
      break
    default:
      toast.warn(message, options)
      break
  }
}
