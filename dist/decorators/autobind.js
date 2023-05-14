export function autobind(_, _2, descriptor) {
    const originalFunction = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalFunction.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
}
