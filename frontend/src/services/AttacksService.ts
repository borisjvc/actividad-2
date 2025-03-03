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

export const PostComment = async (comment: string, user_id: number) => {
  try {
    const response = await axios({
      url: base_url + '/attack/xss',
      method: 'POST',
      headers: headers,
      data: {
        comment,
        user_id,
      },
    })

    return response
  } catch (error) {
    await handleError(error, 'PostComment')
  }
}

export const GetComments = async () => {
  try {
    const response = await axios({
      url: base_url + '/attack/xss',
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (error) {
    await handleError(error, 'getComments')
  }
}
