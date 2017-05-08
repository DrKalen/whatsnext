class TasksController < ApplicationController
    def index
        # first order by done in Ascending order
        # then order by id is descending order.
        # Depending on the way you want the ordering to
        # be, you may want to tweak these values.
        render json: Task.order("done ASC, id DESC")
    end

    def update
        task = Task.find(params[:id])
        task.update_attributes(task_params)
        render json:task
    end

    def create
        task = Task.create(task_params)
        render json: task
    end

    private

    def task_params
        params.require(:task).permit(:done, :title)
    end
end
