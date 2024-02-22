const colors = [
  'bg-red-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-orange-200',
];

export function getColorForUserId(userId: number) {
  // 간단한 해싱 함수로 userId를 배열 길이에 맞는 인덱스로 변환
  const index = Math.abs(userId) % colors.length;
  return colors[index];
}
