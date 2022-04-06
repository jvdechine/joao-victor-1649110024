const toDoItemsRepository = require('../repositories/toDoItemsRepository')();

function toDoItems(){
    async function insertItem(title, description, toDoId, order, done = false, fatherId = undefined){
        try{
            if(!title, !description, !toDoId, !order){
                return {
                    status: false,
                    result: 'Um ou mais campos não foram preenchidos.'
                }
            }
    
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
                        children: items.result.filter(is => is.fatherId && is.fatherId.equals(i._id))
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

    return {
        insertItem,
        getAll
    }
}

module.exports = toDoItems;