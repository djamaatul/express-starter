const redisClient = require("../config/redis")

const DEFAULT_TTL = 20 * 60
const TIME = {
  second: 1,
  minute: 60,
  hour: 60 * 60,
}

function get(key, cb, ttl = 0) {

  if(typeof ttl === "function"){
    ttl = ttl(TIME) ?? 0
  }
  const save = async (newData) => {
    await redisClient.set(key, newData, {
      EX: ttl || DEFAULT_TTL
    })
  }

  return new Promise(async (res) => { // => promise = data
    let data = await redisClient.get(key)
    let newData
    if (!data) {
      newData = await cb()
      if (typeof newData === "object") newData = JSON.stringify(newData)
      await save(newData)
    }
    try {
      data = JSON.parse(newData ?? data)
      if(Array.isArray(data) && !data.length){
        const data = await cb()
        await save(data)
        return data
      }
    } catch (error) {
      data = data
    }
    return res(data)
  })
}

function set(key, value, ttl = 0) {

  if(typeof ttl === "function"){
    ttl = ttl(TIME) ?? 0
  }

  return new Promise(async (res, rej) => {
    try {
      let data = value
      if (typeof data === "object") data = JSON.stringify(data)
      await redisClient.set(key, data, {
        EX: ttl || DEFAULT_TTL
      })
      res(data)
    } catch (error) {
      rej(error)
    }
  })
}

async function remove(key) {
  await redisClient.del(key)
}

module.exports = {
  get,
  set,
  remove
}