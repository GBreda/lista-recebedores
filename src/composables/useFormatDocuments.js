const useFormatDocument = () => {
  const cpfMask = (document) => {
    document = document.replace(/\D/g,"")
    document = document.replace(/(\d{3})(\d)/,"$1.$2")
    document = document.replace(/(\d{3})(\d)/,"$1.$2")
    document = document.replace(/(\d{3})(\d{1,2})$/,"$1-$2")

    return document
   }

  const cnpjMask = (document) => {
    document = document.replace(/\D/g,"")
    document = document.replace(/^(\d{2})(\d)/,"$1.$2")
    document = document.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    document = document.replace(/\.(\d{3})(\d)/,".$1/$2")
    document = document.replace(/(\d{4})(\d)/,"$1-$2")

    return document
  }

  return {
    cpfMask,
    cnpjMask
  }
}

export default useFormatDocument;