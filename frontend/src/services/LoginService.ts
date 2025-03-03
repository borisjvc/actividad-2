import axios from 'axios'

const base_url = 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

const handleError = async (error: any, context: string) => {
  const errorMessage = `Error during ${context}: ${error.message}`
  console.error(errorMessage)

  throw error
}

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await axios({
      url: base_url + '/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    })

    return response
  } catch (error) {
    await handleError(error, 'login')
  }
}

export const RegisterService = async (email: string, password: string) => {
  try {
    const response = await axios({
      url: base_url + '/users/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    })
    return response
  } catch (error) {
    await handleError(error, 'register')
  }
}

export const LogoutService = async () => {
  try {
    const response = await axios({
      url: base_url + '/users/logout',
      method: 'POST',
      headers: headers,
    })
    return response
  } catch (error) {
    await handleError(error, 'logout')
  }
}
