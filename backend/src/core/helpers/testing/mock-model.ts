export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntity: T) {
    this.constructorSpy(createEntity);
  }

  constructorSpy(_createEntity: T): void {}

  async save(): Promise<T> {
    return this.entityStub;
  }
}
