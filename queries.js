
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.hpfheiktgpwlajzoemoy.supabase.co',
  database: 'postgres',
  password: '4ftxVHKKkVYGtXtE',
  port: 5432,
})

// curd operation

const getUsers = (request, response) => {
     try{
    pool.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {

      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
 }
catch(error){
    console.error(error);
    // response.status(400).send(error)

}
}

const getUserById = (request,response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM test WHERE id = $1', [id], (error,results)=>{
        if (error){
          throw error
        }
        response.status(200).json(results.rows)
    })

}


const createUser = (request,response)=>{
    // console.log(request.body)
    const {name, age}=request.body
    console.log(name,age)
    pool.query('INSERT INTO test(name,age)VALUES($1,$2)RETURNING*',[name,age],(error,results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`user added with id : ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, age } = request.body
  
    pool.query('UPDATE test SET name = $1, age = $2 WHERE id = $3',[name, age, id],(error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with id: ${id}`)
      }
    )
  }





const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM test WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with id: ${id}`)
    })
  }

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
