export default function Hexagon({
  className,
  vertical = false,
}: {
  className?: string
  vertical?: boolean
}) {
  return (
    <svg
      className={className}
      fill='#bbcc44'
      // height='23px'
      // width='27.1px'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 184.751 184.751'
    >
      {/* <filter id='blurMe'>
        <feGaussianBlur in='SourceGraphic' stdDeviation='2' />
      </filter> */}
      <path
        d='M0,92.375l46.188-80h92.378l46.185,80l-46.185,80H46.188L0,92.375z'
        // filter='url(#blurMe)'
      />
    </svg>
  )
}
