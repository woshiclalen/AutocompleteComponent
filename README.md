# Autocomplete Component
The `Autocomplete` component is a flexible and customizable React component that provides autocomplete functionality. It supports both `synchronous` and `asynchronous` search modes, allows for multiple selections, and lets you customize how options are rendered.

## Features
- Synchronous and Asynchronous Search: Choose between filtering options locally (`sync`) or fetching them asynchronously (`async`).
- Multiple Selection: Enable multiple selections with the multiple prop.
- Customizable Rendering: Use the `renderOption` prop to customize how each option is displayed.
- Keyboard Navigation: Navigate through options using arrow keys (ArrowUp, ArrowDown) and select with Enter.
- Debounced Input: Debounced input for smoother `async` search experiences.
- One-Click Removal: Click selected item and remove them from the selected list.
- Accessible: Built with accessibility in mind, supporting keyboard and focus interactions.

## Installation
To use the `Autocomplete` component in your project, simply import it:

```
import Autocomplete from './components/Autocomplete'
```

## Props
| Prop Name	| Type	| Default Value	| Description |
| :----- | :-----: | :-----: | :----- |
| searchType	| `sync`  `async`	| `sync`	| **[Additional Prop]** Determines whether the search is synchronous or asynchronous. |
|description	|`string`	| - |	Description text displayed below the input field.|
| disabled	| `boolean`	|`false`|	Disables the input field if set to true.|
| filterOptions	| `function`	| -	|Custom function to filter options.|
| label	|`string`|	- |	Label text displayed above the input field.|
| loading	|`boolean`	|`false`	|Displays a loading indicator if set to true.|
| multiple|	`boolean`	|`false`|	Enables multiple selections if set to true.|
| onChange|	`function`|	-| Callback triggered when the value changes.|
| onInputChange	| `function`	|-	|Callback triggered when the input value changes.|
| options*|	`Array<T>` |	`[]`	|Array of options to display.|
| placeholder|	`string`|	-	|Placeholder text for the input field.|
| renderOption|	`function`	| - |	Custom function to render each option.|
| value|	`Array<T>`, `T`  |	`[]`	|The currently selected value(s).|

\* refers to properties are required for `AutoComplete` to work.

## Usage
### Basic Usage
```
<Autocomplete
    options={["Apple", "Banana", "Cherry"]}
    placeholder="Search fruits..."
/>
```

### Asynchronous Search
```
<Autocomplete
    searchType="async"
    options={["Apple", "Banana", "Cherry"]} // OR dynamically send options via API.
    onInputChange={(inputValue) => {
        // Can choose to fetch options based on inputValue in here.
    }}
    placeholder="Search fruits..."
/>
```

### Multiple Selections
```
<Autocomplete
    multiple={true}
    options={["Apple", "Banana", "Cherry"]}
    placeholder="Select fruits..."
/>
```

### Custom Render Option
```
<Autocomplete
    options={["Apple", "Banana", "Cherry"]}
    renderOption={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>🍎</span>
            <span>{option}</span>
        </div>
    )}
    placeholder="Search fruits..."
/>
```
### With Label and Description
```
<Autocomplete
    label="Fruits"
    description="Select your favorite fruits."
    options={["Apple", "Banana", "Cherry"]}
    placeholder="Search fruits..."
/>
```

## Styling
The component uses Tailwind CSS for styling. You can customize the styles by overriding the default classes or adding your own CSS.

## Accessibility
- The component supports keyboard navigation (ArrowUp, ArrowDown, Enter, Escape). 
- Focus is managed to ensure a smooth user experience.

## Dependencies
- React (v16.8 or higher)
- Tailwind CSS

## Conclusion
This project is built for a Tech Assessment for a Company by Clarence.