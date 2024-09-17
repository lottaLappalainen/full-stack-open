import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests' 
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: () => {
      notifyWith(`too short anecdote, must have length 5 or more`);
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notifyWith(`${content} was added`);
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
