<script lang="ts">
    import {
        Roomtype,
        type PropertyRegistrationRequest,
        type RoomsInfo,
    } from "$lib/global-types/PropertyTypes";

    export let propertyRequest: PropertyRegistrationRequest;

    const roomKeyMap: Record<string, keyof typeof roomInfo> = {
        "Living Rooms": "livingRooms",
        "Bed Rooms": "bedRooms",
        "Bath Rooms": "bathRooms",
        "External BathRooms": "externalBathRooms",
    };

    type RoomInfo = {
        bathRooms: number;
        bedRooms: number;
        livingRooms: number;
        externalBathRooms: number;
    };

    let buttonConfig = [
        {
            name: "Bed Rooms",
            minCount: 1,
            maxCount: 5,
            defaultCount: 2,
        },
        {
            name: "Bath Rooms",
            minCount: 1,
            maxCount: 10,
            defaultCount: 1,
        },
        {
            name: "Living Rooms",
            minCount: 1,
            maxCount: 5,
            defaultCount: 2,
        },
        {
            name: "External BathRooms",
            minCount: 1,
            maxCount: 10,
            defaultCount: 1,
        },
    ];

    // Initialize roomInfo with default values from buttonConfig
    let roomInfo: RoomInfo = {
        bathRooms: buttonConfig[0].defaultCount,
        bedRooms: buttonConfig[1].defaultCount,
        livingRooms: buttonConfig[2].defaultCount,
        externalBathRooms: buttonConfig[3].defaultCount,
    };

    if (propertyRequest != null && propertyRequest.id != null) {
        propertyRequest?.rooms?.forEach((room) => {
            switch (room.roomName) {
                case Roomtype.LIVING_ROOM:
                    roomInfo.livingRooms =
                        room.totalRooms || buttonConfig[2].defaultCount;
                    break;
                case Roomtype.BED_ROOM:
                    roomInfo.bedRooms =
                        room.totalRooms || buttonConfig[1].defaultCount;
                    break;
                case Roomtype.BATH_ROOM:
                    roomInfo.bathRooms =
                        room.totalRooms || buttonConfig[0].defaultCount;
                    break;
                case Roomtype.EXTERNAL_BATHROOM:
                    roomInfo.externalBathRooms =
                        room.totalRooms || buttonConfig[3].defaultCount;
                    break;
            }
        });
    } else {
    }

    // determine input type and assign right value to the request object
    /**
     *
     * @param roomType
     * @param action
     * action {i, d, o} i: increase, d: decrease, o: direct input field changed
     */
    function determineRoomType(roomType: string, action: string) {
        const key = roomKeyMap[roomType];
        const config = buttonConfig.find((c) => c.name === roomType);
        if (!config) return;

        const current = roomInfo[key];

        if (action === "i" && current < config.maxCount) {
            roomInfo[key] = current + 1;
        } else if (action === "d" && current > config.minCount) {
            roomInfo[key] = current - 1;
        }

        // Update propertyRequest
        switch (roomType) {
            case "Living Rooms":
                propertyRequest.totalLivingRooms = roomInfo.livingRooms;
                break;
            case "Bed Rooms":
                propertyRequest.totalBedRooms = roomInfo.bedRooms;
                break;
            case "Bath Rooms":
                propertyRequest.totalBathRooms = roomInfo.bathRooms;
                break;
            case "External BathRooms":
                propertyRequest.totalExternalBathRooms =
                    roomInfo.externalBathRooms;
                break;
        }
    }

    function setRoomNumberBasedOnType(roomType: string, changedVal: number) {
        const value = parseInt(changedVal.toString(), 10);
        switch (roomType) {
            case "Living Rooms":
                propertyRequest.totalLivingRooms = value;
                break;
            case "Bed Rooms":
                propertyRequest.totalBedRooms = value;
                break;
            case "Bath Rooms":
                propertyRequest.totalBathRooms = value;
                break;
            case "External BathRooms":
                propertyRequest.totalExternalBathRooms = value;
                break;
        }
    }
</script>

{#each buttonConfig as config}
    <label
        for="{config.name.toLowerCase().replace(' ', '-')}-input"
        class="sr-only">Choose number of {config.name}:</label
    >
    <div class="relative flex items-center mb-2">
        <button
            type="button"
            id="decrement-button"
            disabled={roomInfo[roomKeyMap[config.name]] <= config.minCount}
            on:click={(e) => determineRoomType(config.name, "d")}
            data-input-counter-decrement="{config.name
                .toLowerCase()
                .replace(' ', '-')}-input"
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
            title={roomInfo[roomKeyMap[config.name]] <= config.minCount
                ? `Mininum ${config.minCount} reached`
                : "Decrease number of rooms"}
        >
            <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                />
            </svg>
        </button>
        <input
            type="number"
            id="{config.name.toLowerCase().replace(' ', '-')}-input"
            on:change={(e) =>
                setRoomNumberBasedOnType(config.name, e.target.value)}
            data-input-counter
            min={config.minCount}
            max={config.maxCount}
            bind:value={roomInfo[roomKeyMap[config.name]]}
            required
            class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div
            class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse"
        >
            <svg
                class="w-2.5 h-2.5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
            >
                <path
                    fill="currentColor"
                    d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
                />
            </svg>
            <span>{config.name}</span>
        </div>
        <button
            type="button"
            id="increment-button"
            disabled={roomInfo[roomKeyMap[config.name]] >= config.maxCount}
            on:click={(e) => determineRoomType(config.name, "i")}
            data-input-counter-increment="{config.name
                .toLowerCase()
                .replace(' ', '-')}-input"
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
            title={roomInfo[roomKeyMap[config.name]] >= config.maxCount
                ? `Maximum ${config.maxCount} reached`
                : "Increase number of rooms"}
        >
            <svg
                class="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                />
            </svg>
        </button>
    </div>
{/each}

<style>
    /* Hide default arrows in number input for Chrome, Safari, Edge */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Hide default arrows in Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
