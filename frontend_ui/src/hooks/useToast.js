import { useSnackbar } from 'notistack'

export function useToast() {
  const { enqueueSnackbar: toast } = useSnackbar()

  return {
    success: (message) => toast(message, { variant: 'success' }),
    error: (message) => toast(message, { variant: 'error' }),
  }
}
