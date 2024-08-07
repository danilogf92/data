<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFuelMeasurementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
        'plant_id' => 'required|exists:plants,id',
        'fuel_equipment_id' => 'required|exists:fuel_equipment,id',
        'start_value' => 'required|integer|min:0',
        'end_value' => 'required|integer|min:0',
        'difference' => 'required|integer|min:0',
        'date' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
        'plant_id.required' => 'The plant field is required.',
        'plant_id.exists' => 'The specified plant does not exist in the plants table.',
        'fuel_equipment_id.required' => 'The fuel equipment field is required.',
        'fuel_equipment_id.exists' => 'The specified fuel equipment does not exist in the fuel equipment table.',
        'start_value.required' => 'The start value field is required.',
        'start_value.integer' => 'The start value field must be an integer.',
        'start_value.min' => 'The start value field must be at least 0.',
        'end_value.required' => 'The end value field is required.',
        'end_value.integer' => 'The end value field must be an integer.',
        'end_value.min' => 'The end value field must be at least 0.',
        'difference.required' => 'The difference field is required.',
        'difference.integer' => 'The difference field must be an integer.',
        'difference.min' => 'The difference field must be at least 0.',
        'date.required' => 'The date field is required.',
        'date.date' => 'The date field must be a valid date.',
        ];
    }    
}
