import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corola' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  public findAll() {
    return this.cars;
  }

  public findOneById(id: string) {
    console.log({ id });
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car whit id '${id}' not found`);
    }
    return car;
  }

  public create(createCarDto: CreateCarDto) {
    const newCar = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  public update(updateCarDto: UpdateCarDto) {
    const car = this.findOneById(updateCarDto.id);
    Object.assign(car, updateCarDto);
    return car;
  }

  public delete(id: string) {
    const index = this.cars.findIndex((car) => car.id === id);

    if (index === -1) {
      throw new NotFoundException(`Car whit id '${id}' not found`);
    }

    this.cars.splice(index, 1);
    return { message: `Car whit id '${id}' deleted` };
  }
}
