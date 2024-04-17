export const ObjError = ({ message, nameError, naiveDesc, array = null, id = null, type = null, naiveDuration = null }) => {
  const error = new Error(message);
  error.name = nameError;
  error.array = array;
  error.naiveDesc = naiveDesc;
  error.id = id;
  error.type = type;
  error.naiveDuration = naiveDuration;
  return error;
};