export default function FractionHelper({
  numerator,
  denominator,
}: {
  numerator: number
  denominator: number
}) {
  return (
    <>
      <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
    </>
  )
}
