const {
  addAddress: addAddressSer,
  updateAddress: updateAddressSer,
  deleteAddress: deleteAddressSer,
} = require('../service/addressService')

const addAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await addAddressSer({
    user_id: ctx.user.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
  })
  ctx.body = 'ok'
}

const updateAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await updateAddressSer({
    id: address.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
  })
  ctx.body = 'ok'
}

const deleteAddress = async (ctx) => {
  const { id } = ctx.request.body
  const result = await deleteAddressSer(id)
  ctx.body = 'ok'
}

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
}
