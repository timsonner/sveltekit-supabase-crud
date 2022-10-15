export const PUT = async ({ request, params }) => {
  const body = await request.json()
    console.log(body)
    const updateCommand = async () => {
        const { command } = body     
          const { data, error } = await supabase
            .from('commands')
            .update({ command: command })
            .match({ id: params.id })
            return data
    }
    updateCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}


export const DELETE = async ({ params }) => {
    console.log(params)
    // const {id} = params
    const deleteCommand = async () => {
        const { data, error } = await supabase
      .from('commands')
      .delete()
          .match({ id: params.id })
        return data
    }
    deleteCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}


