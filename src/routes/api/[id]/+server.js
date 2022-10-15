export const PUT = async ({ request }) => {
    const body = await request.json()
    console.log(body)
    const insertCommand = async () => {
        const { command, id } = body     
          const { data, error } = await supabase
            .from('commands')
            .insert([{ id: id, command: command }])
            return data
    }
    insertCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}


export const DELETE = async ({ params }) => {
    const params = await params
    console.log(params)
    const {id} = params

    const deleteCommand = async () => {
        const { data, error } = await supabase
      .from('commands')
      .delete()
          .match({ id: id })
        return data
    }
    deleteCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}


