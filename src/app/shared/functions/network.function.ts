export function ipFromGrodno(host_ip: string): boolean {
  let result = false
  const ip = host_ip.split('.', 3)
  if (ip[0] == '172') {
    if (ip[1] == '16') {
      result = ['188', '190', '191'].indexOf(ip[2]) >= 0
    } else {
      result = ip[1] == '29'
    }
  }
  return result
}
