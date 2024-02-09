export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntity: T) {
    this.constructorSpy(createEntity);
  }

  constructorSpy(_createEntity: T): void {}

  async save(): Promise<T> {
    return this.entityStub;
  }

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}
