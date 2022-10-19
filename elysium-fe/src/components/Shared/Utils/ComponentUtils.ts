export const doWithMounted = (toDo: (componentMounted: { isMounted: boolean }) => any) => {
    const componentMounted = { isMounted: true }
    const onClear = toDo(componentMounted)
    return () => { componentMounted.isMounted = false; !!onClear && onClear() }
}