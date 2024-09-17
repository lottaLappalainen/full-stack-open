import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests' 
import { useNotify } from './NotificationContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = (votedAnecdote) => {
    const updatedAnecdote = anecdotes.find(anecdote => anecdote.id === votedAnecdote.id)
    const anecdoteToUpdate = {
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1,
    };
    voteAnecdoteMutation.mutate(anecdoteToUpdate)

    notifyWith(`anecdote '${votedAnecdote.content}' voted`)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div>anecdote service is not available due to problems in server</div>
  }
  console.log(JSON.parse(JSON.stringify(result)))

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
