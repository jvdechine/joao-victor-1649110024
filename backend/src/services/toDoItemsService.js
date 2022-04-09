const toDoItemsRepository = require('../repositories/toDoItemsRepository')();

function toDoItems(){
    async function insertItem(title, description, toDoId, order = 1, done = false, fatherId = undefined){
        try{
            if(!title || !toDoId || !order){
                return {
                    status: false,
                    result: 'Um ou mais campos não foram preenchidos.'
                }
            }

            var higherOrder = await toDoItemsRepository.getItemHigherOrder(toDoId);
            if(higherOrder.status && higherOrder.result)
                order = higherOrder.result.order + 1;
            return await toDoItemsRepository.insertItem(title, description, toDoId, order, done, fatherId)
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function getAll(toDoId){
        try{
            var items = await toDoItemsRepository.getAll(toDoId);
            if(items.status && items.result.length > 0){
                var itemsFilter = items.result.filter(i => !i.fatherId);
                var itemsTreated = [];
                itemsFilter.map(i => {
                    itemsTreated.push({
                        _id: i._id,
                        title: i.title,
                        description: i.description,
                        order: i.order,
                        done: i.done,
                        children: items.result.filter(is => is.fatherId && is.fatherId.equals(i._id)),
                        toDoId: toDoId
                    });
                })
                return {
                    status: true,
                    result: itemsTreated
                }
            }else{
                return items;
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function insertAll(toDoItems, toDoId){
        try{
            if(toDoItems && toDoItems.length > 0){
                var result = processItem(toDoItems, toDoId);
                var deleteAll = await toDoItemsRepository.deleteAll(toDoId);
                if(deleteAll.status){
                    return await toDoItemsRepository.insertAll(result);
                }else{
                    return {
                        status: false,
                        result: "Falha ao deletar"
                    }
                }
            }else{
                return  await toDoItemsRepository.deleteAll(toDoId);
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    function processItem(items, toDoId){
        var json = [];
        var index = 0;
        for(var item of items){
            index++;
            var itemJson = {
                title: item.title,
                description: item.description,
                toDoId: toDoId,
                done: item.done,
                order: index
            };
            if(item.children && item.children.length > 0){
                itemJson.children = processItem(item.children, itemJson.toDoId);
            }
            json.push(itemJson);
        }
        return json;
    }

    return {
        insertItem,
        getAll,
        insertAll
    }
}

module.exports = toDoItems;