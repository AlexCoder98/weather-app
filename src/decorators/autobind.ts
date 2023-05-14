export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalFunction: Function = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalFunction.bind(this);
            return boundFunction;
        }
    }
    return adjDescriptor;
}