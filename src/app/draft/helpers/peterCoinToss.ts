import EventEmitter from 'events'

import { getRandomBoolean, sleep } from '../lib/utilityFunctions'

type BoundType = { [key: string]: number[] }
const BOUNDS = {
  numShipments: [1, 1000],
  profitPerShipment: [1, 10000],
  insuranceCost: [1, 10000],
  riskOfLoss: [0, 100],
  startVal: [1, 10000],
} as BoundType

function handleBounds(value: number, boundKey: string) {
  if (value < BOUNDS[boundKey][0]) {
    return BOUNDS[boundKey][0]
  } else if (value > BOUNDS[boundKey][1]) {
    return BOUNDS[boundKey][1]
  } else {
    return value
  }
}
export class CoinTossGame extends EventEmitter {
  private ready = true
  private playedAlready = false
  private shipments = [] as boolean[]
  public values = [] as number[]

  constructor(
    public startVal = 3000,
    public profitPerShipment = 80,
    public insuranceCost = 50,
    public riskOfLoss = 5,
    public numShipments = 100,
    public insured = false,
  ) {
    super()
  }

  public curExpValue() {
    return
  }

  public curGeoMean() {
    return
  }

  public curMedian() {
    // return median(this.results)
  }

  public curVal() {
    if (!this.values.length) {
      return this.startVal
    } else {
      return this.values[this.values.length - 1]
    }
  }

  public expectedValueOfUninsuredShipment() {
    const lossProb = this.riskOfLoss / 100
    return (1 - lossProb) * this.profitPerShipment
  }

  public expectedValueOfInsuredShipment() {
    return this.profitPerShipment - this.insuranceCost
  }

  public expectedValueOfInsurance() {
    return (
      this.expectedValueOfInsuredShipment() -
      this.expectedValueOfUninsuredShipment()
    )
  }

  public uninsuredAverageRateOfCompounding() {
    const lossProb = this.riskOfLoss / 100
    const expectedLostShipments = this.numShipments * lossProb
    const expectedSuccessfulShipments = this.numShipments * (1 - lossProb)

    const successFactor = Math.pow(
      this.startVal + this.profitPerShipment,
      expectedSuccessfulShipments / this.numShipments,
    )
    const lostFactor = Math.pow(
      this.startVal,
      expectedLostShipments / this.numShipments,
    )

    console.log({
      expectedLostShipments,
      expectedSuccessfulShipments,
      successFactor,
      lostFactor,
    })
    return successFactor * lostFactor
  }

  public insuredAverageRateOfCompounding() {
    const successFactor = Math.pow(
      this.startVal + this.profitPerShipment - this.insuranceCost,
      this.numShipments / this.numShipments,
    )

    console.log({
      successFactor,
    })
    return successFactor
  }

  public successfulShipments() {
    return this.shipments.filter((t) => {
      return t
    }).length
  }

  public setStartVal(value: number) {
    this.startVal = parseInt(handleBounds(value, 'startVal') as any)
    this.handleChangeMade()

    return this.startVal
  }

  public setNumShipments(value: number) {
    const newShipments = handleBounds(value, 'numShipments')

    if (newShipments !== this.numShipments) {
      if (this.ready && this.playedAlready) {
        if (newShipments > this.shipments.length) {
          for (let i = 0; i < newShipments - this.shipments.length; i++) {
            const newShipment = getRandomBoolean(this.riskOfLoss / 100)

            this.shipments.push(newShipment)
            this.values.push(this.getNextVal(newShipment, this.curVal()))
          }
        } else {
          this.shipments = this.shipments.slice(0, newShipments)
          this.values = this.values.slice(0, newShipments)
        }
        this.emit('event', this.values)
      }
      this.numShipments = newShipments
    }

    return this.numShipments
  }

  public setProfitPerShipment(value: number) {
    this.profitPerShipment = handleBounds(value, 'profitPerShipment')
    this.handleChangeMade()

    return this.profitPerShipment
  }

  public setInsuranceCost(value: number) {
    this.insuranceCost = handleBounds(value, 'insuranceCost')
    this.handleChangeMade()

    return this.insuranceCost
  }

  public setInsured(value: boolean) {
    this.insured = value
    this.handleChangeMade()

    return this.insuranceCost
  }

  public setRiskOfLoss(value: number) {
    this.riskOfLoss = handleBounds(value, 'riskOfLoss')
    this.handleChangeMade()

    return this.riskOfLoss
  }

  public async begin(pass = false) {
    this.ready = false
    this.emit('ready', this.ready)

    this.values = [this.startVal]

    this.shipments = []
    for (let i = 0; i < this.numShipments; i++) {
      this.shipments.push(getRandomBoolean(this.riskOfLoss / 100))
    }
    console.log({ shipments: this.shipments })

    for (let i = 0; i < this.shipments.length; i++) {
      this.go(this.shipments[i])
      await sleep(3000 / this.shipments.length)
    }

    this.ready = true
    this.emit('ready', this.ready)

    this.playedAlready = true
    this.emit(
      'played',
      //   this.values[
      //     this.values.length - 1
      //   ]
    )
  }

  private rerunWithNewFactor() {
    this.values = []
    this.values.push(Number(this.startVal))

    for (let i = 0; i < this.shipments.length; i += 1) {
      const curVal = this.values[i]
      const nextVal = this.getNextVal(this.shipments[i], curVal)

      this.values.push(nextVal)
    }

    this.emit('event', this.values)
  }

  private getNextVal(successfulShipments: boolean, curVal: number) {
    if (this.insured) {
      return (
        curVal +
        parseInt(this.profitPerShipment as any) -
        parseInt(this.insuranceCost as any)
      )
    } else if (successfulShipments) {
      return curVal + parseInt(this.profitPerShipment as any)
    } else {
      return curVal
    }
  }

  private go(shipmentSuccessul: boolean) {
    const curVal = this.values[this.values.length - 1]
    const nextVal = this.getNextVal(shipmentSuccessul, curVal)

    this.values.push(nextVal)

    this.emit('event', this.values)
  }

  private handleChangeMade() {
    if (this.ready) {
      this.rerunWithNewFactor()
    }
  }
}
