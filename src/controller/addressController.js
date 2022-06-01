const {
  addAddress: addAddressSer,
  updateAddress: updateAddressSer,
  deleteAddress: deleteAddressSer,
  getAddress: getAddressSer,
} = require('../service/addressService')

const addAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await addAddressSer({
    user_id: ctx.user.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
    isDefault: address.isDefault,
  })
  ctx.body = result[0].insertId
}

const updateAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await updateAddressSer({
    user_id: ctx.user.id,
    id: address.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
    isDefault: address.isDefault,
  })
  ctx.body = 'ok'
}

const deleteAddress = async (ctx) => {
  const { id } = ctx.request.body
  const result = await deleteAddressSer(id)
  ctx.body = 'ok'
}

const getAddress = async (ctx) => {
  const { id } = ctx.user
  const result = await getAddressSer(id)

  ctx.body = result[0]
}

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
}
