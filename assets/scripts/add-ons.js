// Radios
document.querySelectorAll('.options .input-radio').forEach((el) => {
  el.addEventListener('change', () => {
    if (el.checked) el.parentNode.parentNode.querySelector('.checkout').classList.add('checked')
    else el.parentNode.parentNode.querySelector('.checkout').classList.remove('checked')
  })
})